import {
  isArray,
  isBuffer,
  isArrayBuffer,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNaN,
  isNull,
  isSymbol,
  isFunction,
} from 'lodash'

export {
  isArray,
  isBuffer,
  isArrayBuffer,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNaN,
  isNull,
  isSymbol,
  isFunction,
  
}

export const isClass = (value: any) => {
  return  isFunction(value) && value.prototype.constructor
}