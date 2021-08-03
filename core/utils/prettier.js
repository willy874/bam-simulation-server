require('prettier')
const path = require('path')

const format = (str) => {
  try {
    return prettier.format(str, require(process.cwd(), '.prettierrc.js'))
  } catch (error) {
    return prettier.format(str, {
      semi: false,
      singleQuote: true,
      arrowParens: 'avoid',
      parser: 'babel',
    })
  }
}

module.exports = {
  format
}