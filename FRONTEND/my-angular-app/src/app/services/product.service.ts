import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const token = sessionStorage.getItem('jwtToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseURL}/products`, { headers });
  }
}