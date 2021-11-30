import http from 'http'

export default async function (req: http.IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    req
      .on('error', reject)
      .on('data', (chunk: Buffer) => {
        resolve(chunk.toString())
      })
      .on('end', resolve)
  })
}