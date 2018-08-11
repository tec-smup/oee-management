import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
      if(this.user.isUserLoggedIn())
        return true;  
      
      this.router.navigate(['/']);      
      return false;
  }
}
