import { Produit } from '../model/produit.model';

export class AddProduit {
  static readonly type = '[Panier] Add Produit';
  constructor(public payload: Produit) {}
 
}
export class RemoveProduit {
    static readonly type = '[Panier] Remove Produit';
    constructor(public id: string) {} // Assure-toi que le type ici correspond au type des id dans tes produits
  }
  