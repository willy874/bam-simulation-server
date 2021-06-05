const Interface = require('./interface')

/**
 * 多重繼承介面的方法
 * @param  {...Interface} args
 * @this {Object|Function} 要使用 call 或 apply 更改，如果沒有設定則回傳一個全新的物件。
 */
module.exports = function implements(...args) {
  const target = this || {}
  args.forEach(item => {
    if (item instanceof Interface) {
      if (typeof item === 'function') {
        Object.keys(item).forEach(key => {
          target.prototype[key] = item[key]
        })
      }
      if (typeof item === 'object') {
        Object.keys(item).forEach(key => {
          target[key] = item[key]
        })
      }
    }
  })
  return target
}
