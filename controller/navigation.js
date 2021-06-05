const Controller = require('./core')
const { NavigationService } = require('../service')
// const fs = require('fs')
// req.get('Authorization')

module.exports = class NavigationController extends Controller {
  constructor(app) {
    super(app)
  }
  getNavigation(req, res) {
    NavigationService.getNavigation()
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status('500').send({
          message: err,
        })
      })
  }
  getNavigationById(req, res) {
    const { id } = req.params
    NavigationService.getNavigation(id)
      .then(result => {
        if (result.length) {
          res.send(result[0])
        } else {
          res.status('404').send()
        }
      })
      .catch(err => {
        res.status('500').send({
          message: err,
        })
      })
  }
}
