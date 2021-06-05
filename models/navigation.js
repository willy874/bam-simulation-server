const Model = require('./core')
module.exports = class NavigationModel extends Model {
  constructor() {
    super()
    this.table = 'navigation'
    this.fillable = [
      'id',
      'uuid',
      'title',
      'sort',
      'path',
      'model',
      'component',
      'parent',
      'alias',
      'group_name',
      'icon',
    ]
  }
}
