import http from 'http'
import { ControllerHandler, MiddlewareHandler, NextHandler } from '@core/types'

export const defaultMiddleware: MiddlewareHandler = (req: http.IncomingMessage, res: http.ServerResponse, next: NextHandler) => {
  next()
}

export const defaultController: ControllerHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end()
}