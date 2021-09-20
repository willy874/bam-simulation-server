import path from 'path'
import fs from 'fs'
import { getModuleDefault } from '@core/utils/path'
import pathConfig from '@app/config/path'

const controllers: Controller[] = []

interface ControllerInit {
  name: string,
}

class Controller {
  name: string = '';

  constructor (args: ControllerInit) {
    this.name = args.name
    controllers.push(this)
  }

  static use (param: Function) {
    if (typeof param === 'function') param(Controller)
    return Controller
  }

  static async createController (callback = (p: Controller[]) => p) {
    const files = await fs.promises.readdir(path.resolve(process.cwd(), pathConfig.controllerPath))
    const arrControllers = files.map(file => {
      try {
        const ControllerModel = getModuleDefault(pathConfig.controllerPath, file)
        return new ControllerModel({ name: ControllerModel.name })
      } catch (error) {
        console.log(`[Controller constructor] Error: The ${file} controllers module must be a export class function.`.red)
      }
    }).filter(c => c)
    return callback(arrControllers)
  }

  static getController (name: string) {
    const c = controllers.find(controller => controller.name === name)
    if (c) {
      return c
    }
    console.log(`[Controller getController] Error: The ${name} controller does not exist.`.red)
    return null
  }
}

export default Controller