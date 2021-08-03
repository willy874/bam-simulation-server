const path = require('path')
const fs = require('fs').promises
const dayjs = require('dayjs')
const { FileName } = require('bam-utility-plugins')
const getExampleText = require('./create.example.js')
const utils = require('../../utils/index.js')

module.exports = function (migrationPath) {
  const scripts = process.env.npm_lifecycle_script.split(' ')
  if (scripts.length > 2) {
    const scriptOrder = scripts[2].split('"')[1]
    const filename = new FileName(scriptOrder)
    const writeString = utils.prettier.format(getExampleText({
      className: filename.ConverBigHump(),
      tableName:filename.data.join('_')
    }))
    fs.writeFile(migrationPath, writeString).then(() => {
      console.log(
        'Create'.green,
        `${filename.ConverBigHump()}Table`.yellow,
        'by',
        dayjs().format('YYYY/MM/DD HH:mm:ss').yellow,
        'success.'.green
      )
    })
  } else {
    console.log('Please fill in the name of the table to be created.'.red)
  }
}