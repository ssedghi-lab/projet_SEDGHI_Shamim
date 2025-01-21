import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../shared/model/produit.model';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })


export class ProductService {

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendCatalogue);
  }
}