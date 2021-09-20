import { Controller } from '@core/types'

export default class BaseController implements Controller {
  [method: string]: import("@core/types").ControllerHandler;

  constructor() {
    console.log('BaseController');
  }
}