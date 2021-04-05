import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from '../auth/login/login.service';

@Injectable()
export class NoAuthGuard implements CanActivate  {
  constructor(private _loginService: LoginService ,
              private _router: Router){}
   canActivate():boolean{
    if (this._loginService.LoggedIn()){
      this._router.navigate(['/pages/dashboard'])
    return false}
    else {
      return true}
   }
}
