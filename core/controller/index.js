const fs = require('fs').promises
const path = require('path')

const controllers = []

module.exports = class Controller {
  constructor (args) {
    const entity = args || {}
    this.name = entity.name
    controllers.push(this)
  }

  static use (param, method) {
    if (typeof param === 'string') Controller.prototype[param] = method
    if (typeof param === 'function') param(Controller)
    if (typeof param === 'object' && param.install) param.install(Controller)
    return Controller
  }

  static async createController (callback = p => p) {
    const files = await fs.readdir(path.resolve(process.cwd(), 'app', 'controllers'))
    const arrControllers = files.map(file => {
      try {
        const ControllerModel = require(path.resolve(process.cwd(), 'app', 'controllers', file))
        return new ControllerModel({ name: ControllerModel.name })
      } catch (error) {
        console.log('[Controller constructor] Error: The controllers module must be a export class function.'.red)
      }
    }).filter(c => c)
    return callback(arrControllers)
  }

  static getController (name) {
    return controllers.find(controller => controller.name === name)
  }
}