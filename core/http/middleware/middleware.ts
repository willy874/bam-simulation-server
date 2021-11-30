import fs from 'fs'
import path from 'path'
import BaseMiddleware from './base'
import config from '@core/config'
import { isClass, logError, ErrorMessage } from '@core/utils'
import { defaultMiddleware } from '../default-handler'

const MiddlewareList: BaseMiddleware[] = []

export default class Middleware {
  static async createMiddleware() {
    const files = await fs.promises.readdir(config.path.middleware)
    files.forEach(file => {
      const Action = require(path.resolve(config.path.middleware, file)).default
      if (isClass(Action)) {
        MiddlewareList.push(new Action()) 
      } else {
        logError(ErrorMessage.NOT_MIDDLEWARE, { scope: ['Middleware', 'createMiddleware'], path: file })
      }
    })
  }

  static get(name: string, method: string) {
    const middleware = MiddlewareList.find(m => m.constructor.name === name)
    if (middleware) {
      return middleware[method]
    }
    logError(ErrorMessage.NOT_MIDDLEWARE, {scope: ['Middleware', 'get'], error: new Error(`${name}@${method}`)})
    return defaultMiddleware
  }
}