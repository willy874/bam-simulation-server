import { Middleware, MiddlewareHandler } from '@core/types'

export default class BaseMiddleware implements Middleware {
  [method: string]: MiddlewareHandler;

  constructor() {
    console.log('BaseMiddleware');
  }
}