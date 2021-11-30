import http from 'http'
import * as regexp from '@core/utils/regexp'
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

  isRouteUrl(req: http.IncomingMessage) {
    const urlData = new URL(req.url || '/', `http://${req.headers.host}`).pathname.split('/')
    return this.url.split('/').every((param, index) => {
      if (urlData[index] === undefined) return false 
      if (regexp.BLOCK_CONTENT.test(param)) return true
      if (new RegExp(`^${param}$`).test(urlData[index])) return true
      return false
    })
  }
}