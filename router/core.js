const SocketServer = require('ws').Server
const fs = require('fs')
const path = require('path')
const Controller = require('../controller')
const ControllerModel = require('../controller/core')

/**
 * @interface ApiOptions
 */
function ApiOptions(args) {
  Object.keys(args).forEach(key => (this[key] = args[key]))
}
ApiOptions.prototype.controller = new ControllerModel() || String()
ApiOptions.prototype.method = String()
ApiOptions.prototype.handle = Function() || String()
ApiOptions.prototype.middleware = Function() || String()
ApiOptions.prototype.prefix = String()
ApiOptions.prototype.url = String()
ApiOptions.prototype.apiUrl = String()
ApiOptions.prototype.callback = Function()

/**
 * @name RouterModel
 * @property {*} entity
 * @property {ExpressApp} app
 * @property {Server} listen
 * @property {Array<ApiOptions>} methodList
 * @property {Array<ControllerModel>} controllerList
 * @property {AuthController} auth
 * @prototype getController
 * @prototype setController
 * @prototype api
 */
module.exports = class RouterModel {
  constructor(args) {
    const entity = args ? args : {}
    this.entity = entity
    this.app = entity.app
    this.listen = entity.listen
    this.methodList = []
    this.controllerList = []
    this.auth = new Controller.AuthController(entity)
    this.authority = entity.authority || []
  }

  getController(handle, controller) {
    if (typeof handle === 'string') {
      if (controller instanceof ControllerModel) {
        return this.setController(controller)[handle]
      } else if (typeof controller === 'string') {
        const targetController = this.controllerList.find(c => c.constructor.name === controller)
        return targetController && targetController[handle]
      }
    } else if (typeof handle === 'function') {
      return handle
    }
    return undefined
  }

  setController(controller) {
    if (!this.controllerList.find(c => c.constructor.name === controller.constructor.name)) {
      this.controllerList.push(controller)
    }
    return controller
  }

  /**
   * Create an API Router.
   * @param {ApiOptions} ops
   * @param {String|ControllerModel} ops.controller This API the Controller
   * @param {String|Function} ops.method This API the HTTP method
   * @param {String} ops.handle This API the handle function nname
   * @param {String|Function} ops.middleware This API the middleware
   * @param {String} ops.prefix This API the url prefix string.
   * @param {String} ops.url This API the path.
   */
  api(ops = new ApiOptions()) {
    const { controller, handle, method, middleware, authorization, prefix, url } = ops
    const controllerMethod = this.getController(handle, controller)
    if (controllerMethod && typeof controllerMethod === 'function') {
      const apiUrl = `/api/${prefix}${url}`
      const options = new ApiOptions({
        ...ops,
        apiUrl,
        middleware: typeof middleware === 'function' ? middleware : this.auth[middleware],
        authorization: typeof authorization === 'function' ? authorization : this.auth[authorization],
        callback: controllerMethod,
      })
      this.methodList.push(options)
      const routeMethods = [options.middleware, controllerMethod]
      if (this.authority.some(name => Controller[name] && controller instanceof Controller[name])) {
        routeMethods.splice(1, 0, this.auth[options.authorization])
      }
      this.app[method](apiUrl, routeMethods)
    }
  }
}
