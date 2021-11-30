import BaseRoute from './base'
import http from 'http'
import HttpRequest from './request'
import HttpResponse from './response'
import { isAsyncFunction, logError, ErrorMessage  } from '@core/utils'

export default function (routes: BaseRoute[], req: http.IncomingMessage, res: http.ServerResponse)  {
  const route = routes.filter(route => route.isRouteUrl(req)).find(p => p)
  const request = new HttpRequest(req, route)
  const response = new HttpResponse(res)
  if (route) {
    
    const callbackNext = (index = 0) => {
      if (route.middlewares[index]) {
        
      } else if (route.controller) {
        route.controller(request, response)
        // logError(ErrorMessage.NO_CONTROLLER_DATA, { scope: ['Route', 'on'] })
      } else {
        
      }
    }
  } else {
    res.write('404');
  }
  res.end();
}