const Model = require('./core')
module.exports = class ImageModel extends Model {
  constructor() {
    super()
    this.table = 'image'
    this.fillable = [
      'id',
      'name',
      'type',
      'size',
      'sort',
      'image_name',
      'image_ext',
      'image_url',
      'image_alt',
      'image_title',
    ]
  }
}
