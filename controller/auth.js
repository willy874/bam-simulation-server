const Controller = require('./core')
// const Model = require('../models')
// const fs = require('fs')
// req.get('Authorization')

module.exports = class AuthController extends Controller {
  constructor(args) {
    super(args)
  }
  Middleware(req, res, next) {
    next()
  }
  Authorization(req, res, next) {
    next()
  }
}
