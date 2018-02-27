import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
      let loggedIn = this.user.getUserLoggedIn();
      console.log('guard', loggedIn); 
      if(!loggedIn)
        this.router.navigate(['/']);
      return loggedIn ;
  }
}
