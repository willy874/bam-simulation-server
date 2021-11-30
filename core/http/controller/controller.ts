import fs from 'fs'
import path from 'path'
import BaseController from './base'
import config from '@core/config'
import { isClass, logError, ErrorMessage } from '@core/utils'
import { defaultController } from '../default-handler'

const ControllerList: BaseController[] = []

export default class Controller {
  static async createController() {
    const files = await fs.promises.readdir(config.path.controller)
    files.forEach(file => {
      const Action = require(path.resolve(config.path.controller, file)).default
      if (isClass(Action)) {
        ControllerList.push(new Action()) 
      } else {
        logError(ErrorMessage.NOT_ROUTER, { scope: ['Controller', 'createController'], path: file })
      }
    })
  }

  static get(name: string, method: string) {
    const controller = ControllerList.find(m => m.constructor.name === name)
    if (controller) {
      return controller[method]
    }
    logError(ErrorMessage.NOT_CONTROLLER, {scope: ['Controller', 'get'], error: new Error(`${name}@${method}`)})
    return defaultController
  }
}