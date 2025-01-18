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

 
/*
  login(username: string, password: string): Observable<any> {
        return this.http.post('/api/login', { username, password });
      }


  register(userData: {username: string; password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => new Error('Failed to register'));
        })
      );
  }
  getProfile(): Observable<UserProfile> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('authToken')}` };
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Failed to load profile:', error);
          return throwError(() => new Error('Failed to load profile'));
        })
      );
  }
  updateProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    return this.http.put(`${this.apiUrl}/profile`, profileData, { headers })
      .pipe(
        catchError(error => {
          console.error('Failed to update profile:', error);
          return throwError(() => new Error('Failed to update profile'));
        })
      );
  }*/
      registerUser(userData: { username: string; password: string }) {
        return this.http.post(`${this.apiUrl}/register`, userData);
      }
    
      loginUser(userData: { username: string; password: string }) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, userData);
      }
    
      // Stocker et récupérer le token
      setToken(token: string) {
        localStorage.setItem('token', token);
      }
    
      getToken(): string | null {
        return localStorage.getItem('token');
      }
    
      isLoggedIn(): boolean {
        return !!this.getToken(); // True si token existe
      }
    
      logout() {
        localStorage.removeItem('token');
      }
}