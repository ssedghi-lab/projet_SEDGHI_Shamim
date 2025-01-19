import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}
interface UserProfile {
  email: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

 

      registerUser(userData: { username: string; password: string }) {
        return this.http.post(`${this.apiUrl}/register`, userData);
      }
    
      loginUser(userData: { username: string; password: string }) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, userData);
      }
    
    setToken(token: string) {
     sessionStorage.setItem('token', token);
     }

     getToken(): string | null {
      return sessionStorage.getItem('token');
    }

    isLoggedIn(): boolean {
     return !!this.getToken(); 
    }

   logout() {
   sessionStorage.removeItem('token');
    }
}