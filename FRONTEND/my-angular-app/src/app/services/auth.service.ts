import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  constructor(private http: HttpClient) {}

 

  registerUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(environment.backendAddClient, userData);
  }

  loginUser(userData: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.backendLoginClient, userData);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  logout() {
    this.token = null;
  }
}