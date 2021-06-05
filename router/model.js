const Controller = require('../controller')
const ControllerModel = require('../controller/core')
const Models = require('../models')
const { FileName } = require('../function')
const RouterModel = require('./core')

module.exports = function createRouterModel(args) {
  const Router = new RouterModel(args)
  const createController = (name = new FileName('')) => {
    const TargetController = Controller[name.ConverBigHump() + 'Controller']
    if (TargetController && TargetController.prototype instanceof ControllerModel) {
      return new TargetController(Router)
    }
    return {}
  }
  Object.keys(Models).forEach(modelName => {
    const name = new FileName(modelName)
    name.data.pop()
    const config = {
      prefix: 'backend',
      controller: createController(name),
      middleware: 'Middleware',
      authorization: 'Authorization',
    }
    Router.api(
      Object.assign({}, config, {
        method: 'get',
        url: `/${name.data.join('-')}`,
        handle: `get${name.ConverBigHump()}`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'get',
        url: `/${name.data.join('-')}/list`,
        handle: `get${name.ConverBigHump()}List`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'get',
        url: `/${name.data.join('-')}/:id?`,
        handle: `get${name.ConverBigHump()}ById`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'post',
        url: `/${name.data.join('-')}`,
        handle: `create${name.ConverBigHump()}`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'put',
        url: `/${name.data.join('-')}`,
        handle: `update${name.ConverBigHump()}`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'put',
        url: `/${name.data.join('-')}/:id?`,
        handle: `update${name.ConverBigHump()}ById`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'patch',
        url: `/${name.data.join('-')}/:id?`,
        handle: `patch${name.ConverBigHump()}ById`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'delete',
        url: `/${name.data.join('-')}`,
        handle: `delete${name.ConverBigHump()}`,
      })
    )
    Router.api(
      Object.assign({}, config, {
        method: 'delete',
        url: `/${name.data.join('-')}/:id?`,
        handle: `delete${name.ConverBigHump()}ById`,
      })
    )
  })
  return Router
}
