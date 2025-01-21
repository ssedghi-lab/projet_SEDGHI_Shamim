import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../shared/model/produit.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) {}

  searchProduits(term: string): Observable<Produit[]> {
    const url = `${environment.apiUrl}/products/search?query=${term}`;
    return this.http.get<Produit[]>(url);
  }
}

