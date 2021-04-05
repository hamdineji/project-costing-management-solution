import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from '../auth/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate  {
  constructor(private _loginService: LoginService ,
              private _router: Router){}
   canActivate():boolean{
    if (this._loginService.LoggedIn()){return true}
    else {this._router.navigate(['/auth/login'])
      return false}
   }
}
