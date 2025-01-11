import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Produit } from '../shared/model/produit.model';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true 
})
export class ProductListComponent implements OnInit {
  produits: Produit[] = [];

  constructor(
    private productService: ProductService,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        console.log('Produits chargés:', this.produits);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }
}
