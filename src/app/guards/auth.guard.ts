import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
      console.log('guard', this.user.isUserLoggedIn());
      if(this.user.isUserLoggedIn())
        return true;  
      
      this.router.navigate(['/']);      
      return false;
  }
}
