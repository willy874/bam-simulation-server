require('colors')
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const createRoute = require('./router/index')
const root = path.join(__dirname)
const baseUrl = process.env.BASE_URL
const publicUrl = process.env.PUBLIC_URL
const storageUrl = process.env.STORAGE_URL
const port = process.env.PORT
const utility = require('bam-utility-plugin/dist/function.cjs')
console.log(utility)

app
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(express.static(path.join(root, publicUrl)))
  .use(express.static(path.join(root, storageUrl)))
app.root = root
const Route = createRoute({
  app,
  listen: app.listen(port, () => {
    // listen callback.
  }),
  database: {},
  /**
   * 設定要加入權限判斷的 Controller
   */
  authority: [],
})
console.log(`${baseUrl}:${port}`.blue)
module.exports = Route
