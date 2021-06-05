module.exports = class Interface {
  constructor(obj, includes) {
    if (typeof obj === 'function' && obj.prototype) {
      if (includes) {
        includes.forEach(key => {
          if (obj.prototype[key]) {
            this[key] = obj.prototype[key]
          }
        })
      }
    }
  }
}
