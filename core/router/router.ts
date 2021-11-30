import fs from 'fs'
import path from 'path'
import http from 'http'
import config from '@core/config'
import { isFunction, setFunctions, setUrlString, logError, ErrorMessage } from '@core/utils'
import Route from './route'
import {
  Application,
  Router,
  RouteHttpOptions,
  MiddlewareHandler,
  HttpMethods,
  RouteEvent
} from '@core/types'
import BaseRoute from './base'
import routerDistributor from './distributor'

export default class RouterNative implements Router {
  app: Application;
  routes: BaseRoute[] = []
  middlewares: MiddlewareHandler[] = []

  constructor (app: Application) {
    this.app = app
  }

  async createRequestListener () {
    const files = await fs.promises.readdir(config.path.router)
    files.forEach(file => {
      const action = require(path.resolve(config.path.router, file)).default
      if (isFunction(action)) {
        action(this) 
      } else {
        logError(ErrorMessage.NOT_ROUTER, { scope: ['Router', 'constructor'], path: file })
      }
    })
    return (req: http.IncomingMessage, res: http.ServerResponse) => {
      routerDistributor.call(this, this.routes, req, res)
    }
  }

  middleware(m: MiddlewareHandler|MiddlewareHandler[]) {
    const middlewares = setFunctions<MiddlewareHandler>([], m)
    return new Route({
      routes: this.routes,
      middlewares
    })
  }

  group(url: string|string[]) {
    return new Route({
      routes: this.routes,
      url: setUrlString('', url)
    })
  }

  http(options: RouteHttpOptions){
    new Route({ routes: this.routes }).http(options)
  }

  on(method: string|HttpMethods,  url: string, routeEvent: RouteEvent){
    new Route({ routes: this.routes }).on(method, url, routeEvent)
  }

  // redirect()
  // view()
}
