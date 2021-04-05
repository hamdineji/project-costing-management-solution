import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LoginService } from '../auth/login/login.service';
import jwt_decode from 'jwt-decode';
@Injectable()
export class PermissionGuardService implements CanActivate {
    permission : any ;
  constructor(public auth: LoginService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    this.permission = jwt_decode(token);
    if (
      !this.auth.LoggedIn() || 
      this.permission.user.permissions !== expectedRole
    ) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}