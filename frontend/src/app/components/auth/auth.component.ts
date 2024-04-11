import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { TokenService } from '../../Services/token-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class authComponent implements OnInit {

  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  firstname: string= '';
  lastname: string= '';
  repeatPassword: string= '';
  email: string = '';
  password: string = '';
  jwtToken: string = '' ;
  

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService // Inject TokenService
  ) {}
  ngOnInit(): void {
    this.tokenService.setToken(this.jwtToken);
  }

  
  login(): void {
    this.userService.login(this.email, this.password).subscribe(
      (response: any) => {
        // Assuming your backend returns JWT token as 'token'
        this.jwtToken = response.token;

        // Store the JWT token using TokenService
        this.tokenService.setToken(this.jwtToken);

        // Store the user role
        console.log(response);
        const userId = response.id;
        const userName = response.name;
        const userRole = response.role;

        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userRole', userRole);


        // Redirect based on user role
        if (userRole == 'admin') {
          this.router.navigate(['/ProductsDash']); // Redirect admin to ProductsDash
        } else {
          this.router.navigate(['/']); // Redirect user to homepage
        }
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
  }

  register(): void {
   
    const user = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      password: this.password,
    };

    this.userService.register(user).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Optionally, redirect to a different page after successful registration
        this.isLoginMode = !this.isLoginMode;

      },
      error => {
        if (this.password !== this.repeatPassword) {
          alert('Passwords do not match');
          // return;
        }else{
          alert('Registration failed');
        }
        
        console.error('Registration failed:', error);
        // Handle registration failure, e.g., display an error message
      }
    );
  }

}
