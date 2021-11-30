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
  const joinUrl = (isArray(param) ? param.join('/') : param)?.replace(/^\//, '') || ''
  url += (/\/$/.test(url) ? joinUrl : ('/' + joinUrl))
  return url
}