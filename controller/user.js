const Controller = require('./core')
// const Model = require('../models')
// const fs = require('fs')
// req.get('Authorization')

module.exports = class UserController extends Controller {
  constructor(app){
      super(app)
  }
  getUser(req, res){
    console.log('getUser')
    res.send('test')
  }
}