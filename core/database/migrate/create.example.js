module.exports = function ({ className, tableName }) {
  return `
const Migration = require('../migration')
const Schema = require('../schema')
const Blueprint = require('../blueprint')

module.exports = class ${className}Table extends Migration {
  constructor(args) {
    const entity = args ? args : {}
    super({
      connection: entity.connection,
      file: entity.file,
    })
    this.tableName = '${tableName}'
  }
  up() {
    return Schema.create(this, (table = new Blueprint()) => {
      table.id()
    })
  }
  down() {
    return Schema.drop(this, (table = new Blueprint()) => {
      table.drop()
    })
  }
}
`
}

