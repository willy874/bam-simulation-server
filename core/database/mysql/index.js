const mysql = require('mysql2')
const path = require('path')
const fs = require('fs').promises
const migrationPath = path.join(process.cwd(), 'database', 'migrations')
const createMigration = require('../migrate/create.js')

module.exports = class Database {
  constructor (options) {
    this.sql = mysql.createConnection({
      host: options.host,
      port: options.port,
      user: options.username,
      password: options.password,
      database: options.database
    })
  }

  static connection(options) {
    return new Database(options)
  }

  async migrate () {
    const migrationDir = await fs.readdir(migrationPath)
  }

  async seed () {
    const seederDir = await fs.readdir(path.join(process.cwd(), 'database', 'seeders'))
  }

  async createMigration () {
    createMigration(migrationPath)
  }
}