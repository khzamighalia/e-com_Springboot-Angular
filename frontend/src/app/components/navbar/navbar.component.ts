import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token-service.service';
import { UserService } from './../../Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
 

    constructor(
      private userService: UserService,
      private router: Router,
      private tokenService: TokenService,
    ) { }
  
    ngOnInit(): void {
      this.isLoggedIn();
    }


    isLoggedIn(): boolean {
      return this.tokenService.getToken() !== null;
    }
  
    logout() {
      this.isLoggedIn();
      this.userService.logout();
    }
  
  
}
