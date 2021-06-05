const Model = require('./core')
module.exports = class ImageRelationModel extends Model {
  constructor() {
    super()
    this.table = 'image_relation'
    this.fillable = ['id', 'image_id', 'relation_name', 'relation_id']
  }
}
