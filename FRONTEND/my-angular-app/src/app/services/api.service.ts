import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { User } from '../shared/model/user';
import { Produit } from '../shared/model/produit.model';
import { environment } from '../environments/environment';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private produitSubject: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>([]);
  public allProducts: Observable<Produit[]> = this.produitSubject.asObservable();
  
  private authUserSubject = new BehaviorSubject<string | undefined>(undefined);
  loginStatus$ = this.authUserSubject.asObservable();
  private currentToken: string | null = null; 
  constructor(private http: HttpClient) {
  }

  public loginClient(username: string, password: string): Observable<HttpResponse<User>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as const
    };
    const data = { username, password };
    return this.http.post<User>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }


  public getUser(userId: string): Observable<User | null> {
    return this.http.get<User | null>(`${environment.apiUrl}/user/get-user?id=${userId}`);
  }


  public setLoginStatus(status: string) {
    this.authUserSubject.next(status);
  }

  public getToken(): string | null {
    return this.currentToken;
  }

  public setToken(token: string): void {
    this.currentToken = token;
  }

  public logout(): void {
    this.currentToken = null; 
    this.authUserSubject.next(undefined);
  }

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  public getUserFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.id : null;
    }
    return null;
  }
}