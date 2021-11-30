import path from 'path'
import http from 'http'
import multiparty from 'multiparty'
import config from '@core/config'

export default async function (req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      autoFiles: true,
      autoFields: true,
      uploadDir: path.resolve(process.cwd(), config.path.storage)
    })
    form
      .parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
        }
        resolve(Object.assign(fields, files))
      })
  })
}