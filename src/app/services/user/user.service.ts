import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor() {     
  }

  isUserLoggedIn() {
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
