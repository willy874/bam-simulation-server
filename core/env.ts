import dotenv from 'dotenv'
import { assign } from './utils'

export default assign({
  ROOT: process.cwd(),
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
  APPLICATION_PATH: 'app',
  ROUTER_PATH: 'router',
  MIDDLEWARE_PATH: 'http/middlewares',
  CONTROLLER_PATH: 'http/controllers',
  STORAGE_PATH: 'storage',
  KEY_PEM:  'keys/key.pem',
  CA_PEM: 'keys/ca.pem',
  CERT_PEM: 'keys/cert.pem',
}, dotenv.config().parsed)