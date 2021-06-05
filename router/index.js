const RouterModel = require('./core')
const createRouterModel = require('./model')
const Controller = require('../controller')

/**
 *
 * @param {*} args 設定參數
 * @return {RouterModel} 回應建立出來的 Router
 */
module.exports = args => {
  const router = createRouterModel(args)
  router.app.get('/', (req, res) => {
    res.send('Hello! This is serve system.')
  })
  // console.log('methodList:', router.methodList)
  // console.log(
  //   'controllerList:',
  //   router.controllerList.map(c => c.constructor.name)
  // )

  return router
}
