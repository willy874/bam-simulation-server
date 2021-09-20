export enum ErrorMessage {
  NO_ROUTER_DATA = 'The router is no data.',
  NOT_ROUTER = 'The router is not function.',
  NO_CONTROLLER_DATA = 'The controller is no data.',
  NOT_CONTROLLER = 'The controller is not function.',
  NOT_MIDDLEWARE = 'The middleware is not function.',
}

interface ErrorOptions {
  scope?: string[],
  path?: string,
  error?: Error
}

export function logError(message: ErrorMessage, ops: ErrorOptions = {}) {
  const scope = ops.scope ? ops.scope.join(' ') : ''
  const errorBlock = scope === '' ? () => 'Log' : () => `[${scope}]`
  console.log(`${errorBlock()} Error: ${message}`.red);
  if (ops.path) console.log('Path: ' + ops.path.blue);
  if (ops.error) console.log(String(ops.error).red);
}