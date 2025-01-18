import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { PanierState } from '../shared/states/panier.state';
import { RemoveProduit } from '../shared/action/panier.actions';
import { Observable } from 'rxjs';
import { Produit } from '../shared/model/produit.model';

@Component({
    selector: 'app-panier',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './panier.component.html',
    styleUrl: './panier.component.css'
})
export class PanierComponent {
  produits$!: Observable<Produit[]>;

  constructor(private store: Store) {
    this.produits$ = this.store.select(PanierState.produits);
  }

  supprimerProduit(produit: Produit) {
    this.store.dispatch(new RemoveProduit(produit.id.toString()));
  }
}