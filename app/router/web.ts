import { Middleware } from '@core/http'
import { Router, HttpRequest, HttpResponse } from '@core/router'
import http from 'http'

const test = (req: HttpRequest, res: HttpResponse) => {
  // res.write('/test 200 OK')
  // res.end()
}

export default function (router: Router) {
  // console.log(router);
  router.group('api').handler((route) =>{
    route.on('POST', 'test', test)
  })
}

