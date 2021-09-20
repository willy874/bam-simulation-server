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

export default class RouterNative implements Router {
  public app?: Application;
  public path = path.resolve(process.cwd(), config.path.application, config.path.router)
  public routes: BaseRoute[] = []

  constructor (app: Application) {
    this.app = app
  }

  async createRequestListener () {
    const files = await fs.promises.readdir(this.path)
    files.forEach(file => {
      const action = require(path.resolve(this.path, file)).default
      if (isFunction(action)) {
        action(this) 
      } else {
        logError(ErrorMessage.NOT_ROUTER, { scope: ['Router', 'constructor'], path: file })
      }
    })
    return (req: http.IncomingMessage, res: http.ServerResponse) => {
      res.write(req.url);
      res.end();
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
