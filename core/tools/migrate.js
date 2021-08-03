require('colors')
global.env = require('dotenv').config().parsed
// const Sql = require('../database/index.js')(env.DB_TYPE)
// global.Database = Sql.connection({
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   username: env.DB_USERNAME,
//   password: env.DB_PASSWORD,
//   database: env.DB_NAME
// })

// const scripts = process.env.npm_lifecycle_script.split(' ')
const npm_config_argv = JSON.parse(process.env.npm_config_argv)
const scriptEvent = process.env.npm_lifecycle_event
const original = npm_config_argv.original
const scriptOriginal = original.slice(2)
console.log(scriptEvent)
console.log(scriptOriginal)