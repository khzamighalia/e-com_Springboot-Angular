import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
  //     return true;
  //   } else {
  //     // Redirect to a different page or show an access denied message
  //     this.router.navigate(['/access-denied']);
  //     return false;
  //   }
  // }
  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      this.router.navigate(['/']); // Redirect user to homepage
      return false; // Block navigation
    }
    return true;
  }
  
}
