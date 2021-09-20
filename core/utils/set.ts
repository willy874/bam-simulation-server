import { isArray, isFunction, isString } from './lang'

export function setFunctions<F>(funcs: F[], param?: F|F[]) {
  let functions: F[] = []
  if (isArray(param)) {
    functions = funcs.concat(...param)
  } else if (isFunction(param)){
    functions = funcs.concat(param)
  }
  return functions
}

export function setUrlString(url: string, param?: string|string[]) {
  if (isArray(param)) {
    url += (/\/$/.test(url) ? param.join('/') : param.join('/'))
  } else if (isString(param)){
    url += (/\/$/.test(url) ? param : ('/ '+ param))
  }
  return url
}