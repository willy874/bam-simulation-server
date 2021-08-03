require('colors')
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
global.env = require('dotenv').config().parsed
global.Controller = require('./controller/index.js')
global.Model = require('./model/index.js')
global.Router = require('./router/index.js')
global.Service = require('./service/index.js')
const Sql = require('./database/index.js')(env.DB_TYPE)
global.Database = Sql.connection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
})

const app = express()
const port = env.PORT
const baseUrl = env.BASE_URL
const publicUrl = env.PUBLIC_URL
const storageUrl = env.STORAGE_URL

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(express.static(path.resolve(process.cwd(), publicUrl)))
  .use(express.static(path.resolve(process.cwd(), storageUrl)))

Router.createRouter().then(() => {
  app.listen(port)
})

console.log(`${baseUrl}:${port}`.blue)
