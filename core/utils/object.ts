export {
  assign,
  forEach,
} from 'lodash'

export const merge = function (dest: unknown, src: unknown, redefine = true) {
  if (!dest) throw new TypeError('argument dest is required')
  if (!src) throw new TypeError('argument src is required')
  Object.getOwnPropertyNames(src).forEach((name) => {
    if (!redefine && Object.hasOwnProperty.call(dest, name)) {
      return
    }
    const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(src, name) || {}
    Object.defineProperty(dest, name, descriptor)
  })
  return dest
}
