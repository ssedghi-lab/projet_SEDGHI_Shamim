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
  
  private refFilter: string = '';
  private libelleFilter: string = '';
  private priceFilter: string = '';

  constructor(private http: HttpClient) {
    this.initializeUser();
  }

  // Initialiser l'utilisateur au démarrage de l'application
  private initializeUser() {
    const userId = this.getUserFromToken();
    if (userId) {
      this.getUser(userId).subscribe({
        next: (user: User | null) => {
          this.authUserSubject.next(user ? user.username : undefined);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        },
      });
    }
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

  public getCatalogue(): Observable<Produit[]> {
    const token = sessionStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Produit[]>(environment.backendCatalogue, { headers });
 }
  

  public addUser(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/add`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public updateUser(user: User): Observable<any> {
    console.log("updateUser");
    let data: string;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = `login=${user.username}&password=${user.password}`;
    return this.http.put(
      environment.backendUpdateClient,
      data,
      httpOptions
    );
  }

  public getUser(userId: string): Observable<User | null> {
    return this.http.get<User | null>(`${environment.apiUrl}/user/get-user?id=${userId}`);
  }

  public setFilter(name: string, value: string) {
    this[name as 'refFilter' | 'libelleFilter' | 'priceFilter'] = value;
  }

  public filter() {
    return this.getCatalogue().pipe(
      map((products: Produit[]) => {
        return products.filter(product => {
          let res = true;
          res = res && product.id.toString().indexOf(this.refFilter) > -1;
          res = res && product.ref.indexOf(this.libelleFilter) !== -1;
          res = res && product.prix.toString().indexOf(this.priceFilter) > -1;
          return res;
        });
      }),
      map((filteredProduits: Produit[]) => {
        this.produitSubject.next(filteredProduits);
        return filteredProduits;
      })
    );
  }

  public setLoginStatus(status: string) {
    this.authUserSubject.next(status);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  public setToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
  }

  public logout(): void {
    sessionStorage.removeItem('jwtToken'); 
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