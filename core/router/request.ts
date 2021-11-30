// import os from 'os'
// import net from 'net'
// import url from 'url'
// import path from 'path'
import http from 'http'
import BaseRoute from './base'
import jsonParser from './parser/json'
import textParser from './parser/text'
import urlencodedParser from './parser/urlencoded'
import multipartParser from './parser/multipart'
import { isArray } from '@core/utils'
import * as regexp from '@core/utils/regexp'
import { Data } from '@core/types'
// import fresh from 'fresh'
// import iconv from 'iconv-lite'
// import accepts from 'accepts'
// import parseurl from 'parseurl'
// import proxyAddr from 'proxy-addr'

export default class HttpRequest {
  route?: BaseRoute
  request: http.IncomingMessage
  headers: Data = {}
  params: Data = {}
  query: Data = {}
  method: string
  url: URL
  hash: string
  host: string
  href: string
  origin: string
  pathname: string
  port: string
  search: string
  searchParams: URLSearchParams
  body?: unknown

  constructor(req: http.IncomingMessage, route?: BaseRoute) {
    this.route = route
    this.request = req
    this.method = (req.method || '').toUpperCase()
    this.url = new URL(req.url || '/', req.headers.referer || `http://${req.headers.host}`)
    this.hash = this.url.hash
    this.host = this.url.host
    this.href = this.url.href
    this.origin = this.url.origin
    this.pathname = this.url.pathname
    this.port = this.url.port
    this.search = this.url.search
    this.searchParams = this.url.searchParams
    this.init().then(() => {
      console.log('body: ', this.body);
    })
  }

  init() {
    this.setHeader(this.request.headers)
    this.setParam()
    this.setQueryString()
    return new Promise((resolve, reject) => {
      this.parseBody().then(resolve).catch(reject)
    })
  }
  
  get xhr () {
    const val = this.getHeader('X-Requested-With') || '';
    return val.toLowerCase() === 'xmlhttprequest';
  }

  get protocol () {
    const header = this.getHeader('X-Forwarded-Proto') || this.url.protocol
    const index = header.indexOf(',')
    return index !== -1
      ? header.substring(0, index).trim()
      : header.trim()
  }

  get hostname () {
    let host = this.getHeader('Host') || this.getHeader('X-Forwarded-Host') || this.url.hostname
    if (host.indexOf(',') !== -1) {
      host = host.substring(0, host.indexOf(',')).trimRight()
    }
    if (!host) return
    const offset = host[0] === '[' ? host.indexOf(']') + 1 : 0
    const index = host.indexOf(':', offset)
    return index !== -1 ? host.substring(0, index) : host;
  }

  parseBody () {
    return new Promise((resolve, reject) => {
      const contentType = this.getHeader('content-type')
      switch (true) {
        case /json/.test(contentType):
          jsonParser(this.request).then(data => {
            this.body = data
            resolve({})
          })
          return 
        case /text/.test(contentType):
          textParser(this.request).then(data => {
            this.body = data
            resolve({})
          })
          return 
        case /urlencoded/.test(contentType): 
          urlencodedParser(this.request).then(data => {
            this.body = data
            resolve({})
          })
        return
        case /multipart/.test(contentType): 
          multipartParser(this.request).then(data => {
            this.body = data
            resolve({})
          })
        return
        default:
          this.request
            .on('error', reject)
            .on('data', (chunk) => {
              this.body = chunk
            })
            .on('end', resolve)
      }
    })
  }

  setParam(params?: Data) {
    if (params) {
      this.params = params
    } else {
      const reqUrlData = this.pathname.split('/')
      const routeUrl = this.route && this.route.url.split('/') || []
      routeUrl.forEach((param, index) => {
        if (regexp.BLOCK_CONTENT.test(param) && param !== '{}') {
          this.params[param.replace(/^{|}$/g, '')] = reqUrlData[index]
        }
      })
    }
  }

  setQueryString(query?: Data) {
    if (query) {
      this.searchParams = new URLSearchParams(query)
    }
    this.searchParams.forEach((value, key) => {
      this.query[key] = value
    })
  }

  getHeader(name: string) {
    const value = this.headers[name.toLowerCase()]
    return value || ''
  }

  setHeader(headers: http.IncomingHttpHeaders) {
    for (const name in headers) {
      const value = headers[name] || ''
      if (isArray(value)) {
        this.headers[name.toLowerCase()] = value.join(',')
      } else {
        this.headers[name.toLowerCase()] = value
      }
    }
  }
  
  getParam(name: string) {
    return this.params[name] || ''
  }

  getQuery(name: string) {
    return this.query[name] || ''
  }

}
