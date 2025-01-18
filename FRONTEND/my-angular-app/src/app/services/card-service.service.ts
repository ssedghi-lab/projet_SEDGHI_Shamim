// src/app/services/card.service.ts
import { Injectable, signal, Signal } from '@angular/core';
import { Card } from '../card-management/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private listCards = signal<Card[]>([]);

  getCartes(): Signal<Card[]> {
    return this.listCards.asReadonly();
  }

  addCarte(newCard: Card): void {
    this.listCards.update((cards) => [...cards, newCard]);
  }
  
  delCarte(carteId: number): void {
    this.listCards.update((cards) => cards.filter((card) => card.id !== carteId));
  }
}