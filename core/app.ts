import fs from 'fs'
import http from 'http'
import https from 'https'
import { Router } from './router'
import { Application } from './types'
import globalEnv from './env'
import config from './config'

export default class App implements Application {
  constructor() {
    this.init().then(server => {
      server.listen({
        port: globalEnv.PORT,
        host: globalEnv.HOST,
      })
      console.log(`server is listening on ${globalEnv.PORT}.`.green);
      console.log(`http://${globalEnv.HOST}:${globalEnv.PORT}.`.blue);
    })
  }

  async init() {
    const router: Router = new Router(this)
    // 判斷處理 SSL 金鑰
    const hasFiles = [fs.existsSync(config.path.key), fs.existsSync(config.path.ca), fs.existsSync(config.path.cert)]
    if (hasFiles.every(b => b)) {
      const options: https.ServerOptions = {
        key: await fs.promises.readFile(config.path.key),
        ca: await fs.promises.readFile(config.path.ca),
        cert: await fs.promises.readFile(config.path.cert)
      }
      return https.createServer(options, await router.createRequestListener())
    }
    // 非 https
    return http.createServer(await router.createRequestListener())
  }

  static get env() {
    return globalEnv
  }

  static set env(data) {
    for (const key in globalEnv) {
      globalEnv[key] = data[key]
    }
  }

  static setEnv(key: string, value: string) {
    globalEnv[key] = value
  }
}

