const mysql = require('mysql')

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

const connection = mysql.createConnection(config)

function handleDisconnect() {
  connection.on('error', err => {
    if (!err.fatal) {
      return
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err
    }

    console.log('Re-connecting lost connection: '.red + err.stack)

    connection = mysql.createConnection(config)
    handleDisconnect()
    connection.connect()
  })
}
handleDisconnect()
connection.connect()

module.exports = connection
