import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { PanierState } from '../shared/states/panier.state';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  imports: [CommonModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css'
})
export class HeaderComponent {
  count$!: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(PanierState.count);
  }
}