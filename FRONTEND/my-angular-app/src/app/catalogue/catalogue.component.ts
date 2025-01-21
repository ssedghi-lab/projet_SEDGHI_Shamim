import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddProduit } from '../shared/action/panier.actions';
import { Produit } from '../shared/model/produit.model';
import { ProductService } from '../services/product.service';
import { SearchServiceService } from '../services/search-service.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-catalogue',
    imports: [CommonModule ,FormsModule],
    standalone: true,
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.css']
  })

export class CatalogueComponent implements OnInit {
  originalProduits: Produit[] = [];
  produits: Produit[] = [];

  searchTerm: string = '';

  constructor(
    private produitService: ProductService,
    private searchService: SearchServiceService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.originalProduits = data;
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits :', err);
      }
    });
  }

 
  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.produits = this.originalProduits;
      return;
    }

    this.searchService.searchProduits(this.searchTerm.trim()).subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche des produits :', err);
      }
    });
  }

  ajouterAuPanier(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
  
  }
  
}
