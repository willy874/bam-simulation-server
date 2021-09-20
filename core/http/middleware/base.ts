import { Middleware } from '@core/types'

export default class BaseMiddleware implements Middleware {
  [method: string]: import("@core/types").MiddlewareHandler;

  constructor() {
    console.log('BaseMiddleware');
  }
}