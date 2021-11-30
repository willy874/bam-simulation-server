import { Controller, ControllerHandler } from '@core/types'

export default class BaseController implements Controller {
  [method: string]: ControllerHandler;

  constructor() {
    console.log('BaseController');
  }
}