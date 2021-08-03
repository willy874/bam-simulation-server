module.exports = function (type) {
  switch (type) {
    case 'mysql': return require('./mysql/index')
  }
}