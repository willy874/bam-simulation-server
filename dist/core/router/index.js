"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const routes = []
// const controllerHandler = (handler: unknown) => {
//   if (Array.isArray(handler)) {
//     return handler
//   }
//   if (typeof handler === 'function') {
//     return [handler]
//   }
//   if (typeof handler === 'string') {
//     try {
//       if (/^\S+@\S+$/.test(handler)) {
//         return [Controller.getController(...handler.split('@'))]
//       }
//       if (/^(\S+\.\S+)+$/.test(handler)) {
//         const handlerPath = handler.split('.').filter(s => s).map((m, i, arr) => i === arr.length - 1 ? m + '.js' : m)
//         return [require(path.resolve(process.cwd(), ...handlerPath))]
//       }
//       return []
//     } catch (error) {
//       console.log('[controllerHandler] Error: The routes url string must be a return controller function.'.red)
//     }
//   }
// }
// const routeHandler = (route, method, url, handler) => {
//   route.method = method.toLowerCase()
//   route.url = route.url + '/' + url
//   route.controller = route.controller.concat(controllerHandler(handler))
//   route.router.app[method](route.url, route.middleware.concat(route.controller))
//   routes.push(route)
// }
// class Route {
//   constructor ({ router, url, middleware, method, controller }) {
//     this.router = router
//     this.url = url ? '/' + url : '/'
//     this.method = method || 'GET'
//     this.middleware = middleware ? [middleware] : []
//     this.controller = controller ? [controller] : []
//   }
//   middleware (handler, groupCallback) {
//     if (typeof handler === 'function') {
//       this.middleware = this.middleware.concat([handler])
//     } else if (Array.isArray(handler)) {
//       this.middleware = this.middleware.concat(handler)
//     } else {
//       console.log('[Route middleware] Error: The argument handler must be a function.'.red)
//     }
//     groupCallback(this)
//   }
//   get (url, ...handler) {
//     routeHandler(this, 'get', url, handler)
//   }
//   post (url, ...handler) {
//     routeHandler(this, 'post', url, handler)
//   }
//   put (url, ...handler) {
//     routeHandler(this, 'put', url, handler)
//   }
//   delete (url, ...handler) {
//     routeHandler(this, 'delete', url, handler)
//   }
//   group (args, groupCallback) {
//     this.middleware(args.middleware)
//     route.url = route.url + '/' + url
//     groupCallback(this)
//   }
// }
// module.exports = class Router {
//   constructor (app) {
//     this.app = app
//     this.routes = routes
//     this.controller = Controller.createController()
//     fs.promises.readdir(path.resolve(process.cwd(), 'app', 'routes')).then(files => {
//       files.forEach(file => {
//         try {
//           require(path.resolve(process.cwd(), 'app', 'routes', file))(this)
//         } catch (error) {
//           console.log('[Router constructor] Error: The routes module must be a export function.'.red)
//         }
//       })
//     })
//   }
//   get (url, ...handler) {
//     routeHandler(new Route({ url, controller: handler , router: this }), 'get', url, handler)
//   }
//   post (url, ...handler) {
//     routeHandler(new Route({ url, controller: handler , router: this }), 'post', url, handler)
//   }
//   put (url, ...handler) {
//     routeHandler(new Route({ url, controller: handler , router: this }), 'put', url, handler)
//   }
//   delete (url, ...handler) {
//     routeHandler(new Route({ url, controller: handler , router: this }), 'delete', url, handler)
//   }
//   group (args, groupCallback) {
//     groupCallback(new Route({ ...args, router: this }))
//   }
//   static async createRouter (app) {
//     return new Router(app)
//   }
// }
