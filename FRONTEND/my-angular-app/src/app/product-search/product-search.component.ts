import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produit } from '../shared/model/produit.model';
import { SearchServiceService } from '../services/search-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  produits$: Observable<Produit[]> = of([]); 

  constructor(private searchService: SearchServiceService) { }

  updateProduits(input: string) {
    this.produits$ = input.trim() ? this.searchService.searchProduits(input.trim()) : of([]);
  }
}
