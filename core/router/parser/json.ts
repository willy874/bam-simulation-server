import http from 'http'

export default async function (req: http.IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    req
      .on('error', reject)
      .on('data', (chunk: Buffer) => {
        const data = chunk.toString()
        try {
          resolve(JSON.parse(data)) 
        } catch (error) {
          resolve(data)
        }
      })
      .on('end', resolve)
  })
}