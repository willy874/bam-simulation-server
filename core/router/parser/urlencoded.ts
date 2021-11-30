import http from 'http'

type Data = {
  [key: string]: unknown;
}

export default async function (req: http.IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    req
      .on('error', reject)
      .on('data', (chunk: Buffer) => {
        const data: Data = {}
        const qs = new URLSearchParams(chunk.toString())
        qs.forEach((value, key) => {
          try {
            data[key] = JSON.parse(value)
          } catch (error) {
            data[key] = value
          }
        })
        resolve(data)
      })
      .on('end', resolve)
  })
}