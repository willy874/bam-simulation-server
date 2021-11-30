import path from 'path'
import globalEnv from './env'

export default {
  path: {
    storage: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.STORAGE_PATH),
    router: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.ROUTER_PATH),
    middleware: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.MIDDLEWARE_PATH),
    controller:  path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.CONTROLLER_PATH),
    key: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.KEY_PEM),
    ca: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.CA_PEM),
    cert: path.resolve(globalEnv.ROOT, globalEnv.APPLICATION_PATH, globalEnv.CERT_PEM),
  }
}