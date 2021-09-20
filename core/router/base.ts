
import { BaseRoute, BaseRouteOptions, ControllerHandler, MiddlewareHandler } from '@core/types'

export default class BaseRouteNative implements BaseRoute {
  method: string
  url: string
  controller?: ControllerHandler
  middlewares: MiddlewareHandler[]

  constructor (options: BaseRouteOptions) {
    this.method = options.method.toUpperCase()
    this.url = options.url
    this.controller = options.controller
    this.middlewares = options.middlewares
  }
}