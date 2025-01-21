import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Produit } from '../shared/model/produit.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  
  private produitsSubject = new BehaviorSubject<Produit[]>([]);
  produits$ = this.produitsSubject.asObservable();

  constructor(private http: HttpClient) {}

  filterProduits(searchTerm: string): void {
    this.http.get<Produit[]>(environment.backendSearch, {
      params: { search: searchTerm }
    }).subscribe({
      next: (filteredData) => {
        this.produitsSubject.next(filteredData);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération filtrée:', err);
        this.produitsSubject.next([]);
      }
    });
  }

}