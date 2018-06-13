import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.user$.map( user => {
      if (user) {
        return true;
      }
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    });
  }

}
