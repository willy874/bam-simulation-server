import http from 'http'
import HttpRequest from '@core/router/request'
import HttpResponse from '@core/router/response'

export type Data = {
  [key: string]: string
}

export declare class Application {
  constructor()
  init(): Promise<http.Server>;
}

export declare class Router extends RouteMethods {
  public app?: Application;
  public routes: BaseRoute[];
  public middlewares?: MiddlewareHandler|MiddlewareHandler[]
  constructor (app: Application)
  createRequestListener(req: http.IncomingMessage, res: http.ServerResponse): Promise<http.RequestListener>;
}

export declare class Route extends RouteMethods {
  public middlewares: MiddlewareHandler[]
  constructor(ops: RouteOptions)
  handler<T>(callback: RouteHandler<T>): T
}

export declare class RouteMethods {
  middleware(m: MiddlewareHandler|MiddlewareHandler[]): Route
  group(url: string|string[]): Route
  http(options: RouteHttpOptions): void
  on(method: string|HttpMethods,  url: string, routeEvent: RouteEvent): void
}

export interface RouteOptions {
  routes: BaseRoute[]
  middlewares?: MiddlewareHandler|MiddlewareHandler[]
  url?: string
}

export declare class BaseRoute {
  public method: string
  public url: string
  public controller?: ControllerHandler
  public middlewares: MiddlewareHandler[]
  constructor(ops: RouteOptions)
  isRouteUrl(req: http.IncomingMessage): boolean
}

export declare interface BaseRouteOptions {
  method: string
  url: string
  controller?: ControllerHandler
  middlewares: MiddlewareHandler[]
}

export interface RouteHttpOptions {
  method: HttpMethods|string
  controller: ControllerHandler
  middlewares?: MiddlewareHandler|MiddlewareHandler[]
  url?: string
}

export type RouteEvent = string|ControllerHandler|[...MiddlewareHandler[] ,ControllerHandler]

export type RouteHandler<T> = (route: Route) => T

export type NextHandler = () => void

export type ControllerHandler = (req: HttpRequest, res: HttpResponse) => void

export type MiddlewareHandler = (req: HttpRequest, res: HttpResponse, next: NextHandler) => void

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD'
}

export declare class Middleware {
  constructor()
  [method: string]: MiddlewareHandler
}

export declare class Controller {
  constructor()
  [method: string]: ControllerHandler
}