import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'
import dotenv from 'dotenv'
import { assign } from './utils'
import { Router } from './router'
import { Application } from './types'
import config from './config'

export default class App implements Application {
  public env: NodeJS.ProcessEnv = {
    ROOT: process.cwd() || '',
    PORT: '3000',
    HOST: 'localhost',
    PUBLIC_URL: 'public',
    STORAGE_URL: 'storage',
    DB_TYPE: 'mysql',
    DB_HOST: 'localhost',
    DB_USERNAME: '',
    DB_PASSWORD: '',
    DB_NAME: '',
    DB_PORT: '3306',
    KEY_PEM: '',
    CA_PEM: '',
    CERT_PEM: '',
  };

  constructor(env?: NodeJS.ProcessEnv) {
    this.env = assign(this.env, dotenv.config().parsed, env || {})
    this.init().then(server => {
      server.listen({
        port: this.env.PORT,
        host: this.env.HOST,
      })
      console.log(`server is listening on ${this.env.PORT}.`.green);
      console.log(`http://${this.env.HOST}:${this.env.PORT}.`.blue);
    })
  }

  async init() {
    const router: Router = new Router(this)
    const root = this.env.ROOT || ''
    // 判斷處理 SSL 金鑰
    if (this.env.KEY_PEM && this.env.CA_PEM&& this.env.CERT_PEM) {
      const keysPath = {
        key: path.resolve(root, config.path.application, config.path.key, this.env.KEY_PEM),
        ca: path.resolve(root, config.path.application, config.path.key, this.env.CA_PEM),
        cert: path.resolve(root, config.path.application, config.path.key, this.env.CERT_PEM)
      }
      const hasFiles = [fs.existsSync(keysPath.key), fs.existsSync(keysPath.ca), fs.existsSync(keysPath.cert)]
      if (hasFiles.every(b => b)) {
        const options: https.ServerOptions = {
          key: await fs.promises.readFile(keysPath.key),
          ca: await fs.promises.readFile(keysPath.ca),
          cert: await fs.promises.readFile(keysPath.cert)
        }
        return https.createServer(options, await router.createRequestListener())
      }
    }
    // 非 https
    return http.createServer(await router.createRequestListener())
  }
}

