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
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        // On stocke la liste complète
        this.originalProduits = data;
        // On affiche la même liste au départ
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits :', err);
      }
    });
  }

  /** Filtrage local */
  onSearchChange(): void {
    // Si la barre de recherche est vide, on réaffiche tout
    if (!this.searchTerm.trim()) {
      this.produits = this.originalProduits;
      return;
    }

    const lowerTerm = this.searchTerm.toLowerCase();
    this.produits = this.originalProduits.filter((produit) =>
      produit.libelle.toLowerCase().includes(lowerTerm)
    );
  }
  ajouterAuPanier(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
  
  }
  
}
