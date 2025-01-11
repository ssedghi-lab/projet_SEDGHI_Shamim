import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { AddProduit, RemoveProduit } from '../action/panier.actions';

export interface PanierStateModel {
  produits: Produit[];
}

@Injectable({
  providedIn: 'root',
})

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    produits: []
  }
})
export class PanierState {
  @Selector()
  static produits(state: PanierStateModel): Produit[] {
    return state.produits;
  }

  @Selector()
  static count(state: PanierStateModel): number {
    return state.produits.length;
  }

  @Action(AddProduit)
  addProduit(ctx: StateContext<PanierStateModel>, action: AddProduit) {
    const state = ctx.getState();
    ctx.patchState({
      produits: [...state.produits, action.payload]
    });
  }
  

  @Action(RemoveProduit)
  removeProduit(ctx: StateContext<PanierStateModel>, action: RemoveProduit) {
    const state = ctx.getState();
    const index = state.produits.findIndex(p => p.id === action.id);
    if (index > -1) {
      const produits = [...state.produits];
      produits.splice(index, 1);
      ctx.patchState({ produits });
    }
  }
}  