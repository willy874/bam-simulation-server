const models = require('../models')
const Model = require('../models/core')
const { FileName } = require('../function')
const implements = require('./implements')
const SqlInterface = require('./sql-interface')

/**
 * @name Repository
 * @param {String} modelName 要建構的模型名稱
 * @param {*} ops 設定參數
 * @returns {Model} 建構一個新的 Model
 */
module.exports = function repository(modelName, ops = {}) {
  const name = new FileName(modelName)
  const BaseModel = models[name.ConverBigHump()]

  if (BaseModel) {
    console.log(BaseModel)
    return implements.apply(new BaseModel(), [SqlInterface])
  }
}
