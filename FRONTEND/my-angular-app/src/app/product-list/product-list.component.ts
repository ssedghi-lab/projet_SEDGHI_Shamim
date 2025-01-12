import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/states/auth.state';
import { Produit } from '../shared/model/produit.model';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true
})
export class ProductListComponent implements OnInit {
  produits: Produit[] = [];
  isAuthenticated$: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  }


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
