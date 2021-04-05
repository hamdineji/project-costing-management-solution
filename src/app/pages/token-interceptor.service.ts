import { Injectable , Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { LoginService } from '../@core/auth/login/login.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }
  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
    return next.handle(tokenizedReq)
  }
}
