import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { TokenService } from './token-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users'; 
  private readonly ADMIN_ROLE = 'admin';
  private readonly USER_ROLE = 'user';
  

  constructor(private http: HttpClient,private router: Router,private tokenService: TokenService) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  login(email: string, password: string): Observable<any> {
    // Make HTTP request to backend to authenticate user
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  logout(): void {
    this.tokenService.clearToken(); // Clear the authentication token
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth']); // Redirect to the login page
  
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('role');
  // }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === this.ADMIN_ROLE;
  }
}
