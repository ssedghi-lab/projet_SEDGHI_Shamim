import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

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

  constructor(private http: HttpClient) {}

 

      registerUser(userData: { username: string; password: string }) {
        return this.http.post(environment.backendAddClient, userData);
      }
    
      loginUser(userData: { username: string; password: string }) {
        return this.http.post<{ token: string }>(environment.backendLoginClient, userData);
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