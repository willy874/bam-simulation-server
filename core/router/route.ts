import { isArray, isFunction, isString, setFunctions, setUrlString, logError, ErrorMessage } from '@core/utils'
import {
  Route,
  RouteOptions,
  RouteHttpOptions,
  RouteHandler,
  RouteEvent,
  MiddlewareHandler,
  HttpMethods
} from '@core/types'
import BaseRoute from './base'
import { Middleware, Controller } from '@core/http'

export default class RouteNative implements Route {
  public middlewares: MiddlewareHandler[] = []
  public url: string = '/'
  public routes: BaseRoute[] = []

  constructor(options: RouteOptions) {
    this.routes = options.routes
    this.url = setUrlString(this.url, options.url)
    this.middlewares = setFunctions<MiddlewareHandler>(this.middlewares, options.middlewares)
  }

  middleware(middlewares: MiddlewareHandler|MiddlewareHandler[]) {
    this.middlewares = setFunctions<MiddlewareHandler>(this.middlewares, middlewares)
    return this
  }

  group(url: string|string[]) {
    this.url = setUrlString(this.url, url)
    return this
  }

  handler<T>(callback: RouteHandler<T>): T {
    return callback(this)
  }

  http(options: RouteHttpOptions) {
    this.routes.push(
      new BaseRoute({
        method: options.method.toUpperCase(),
        url: setUrlString(this.url, options.url),
        controller: options.controller,
        middlewares: setFunctions<MiddlewareHandler>(this.middlewares, options.middlewares),
      })
    )
  }

  on(method: string|HttpMethods,  url: string, routeEvent: RouteEvent){
    const route = new BaseRoute({
      method: method.toUpperCase(),
      url: setUrlString(this.url, url),
      middlewares: this.middlewares.slice(),
    })
    if (isFunction(routeEvent)) {
      route.controller = routeEvent
    } else if (isArray(routeEvent)) {
      const callback = routeEvent
      const middlewares = callback.splice(0, callback.length - 1)
      const controller = (req: any, res: any) => {
        const run = callback.length ? callback[0] : callback[callback.length - 1]
        run(req, res, () => {})
      }
      route.controller = controller
      route.middlewares = setFunctions<MiddlewareHandler>(this.middlewares, middlewares)
    } else if (isString(routeEvent)) {
      const middlewareString = routeEvent.split('.')
      if (middlewareString.every(s => /@/.test(s))) {
        // 取出 Controller
        const controllerString = middlewareString.splice(middlewareString.length - 1, 1)[0]
        const [controllerClass, controllerName] = controllerString.split('@')
        route.controller = Controller.get(controllerClass, controllerName)
        // 取出 Middleware
        const middlewares: MiddlewareHandler[] = middlewareString.map(ms => {
          const [middlewareClass, middlewareName] = ms.split('@')
          return Middleware.get(middlewareClass, middlewareName)
        })
        route.middlewares = setFunctions<MiddlewareHandler>(this.middlewares, middlewares)
      } else {
        logError(ErrorMessage.NOT_CONTROLLER, { scope: ['Route', 'on', 'isString'] })
      }
    }
    this.routes.push(route)
  }
}