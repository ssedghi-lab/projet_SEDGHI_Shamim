export interface Produit {
  id: string; // UUID
  ref: string;
  libelle: string;
  prix: number;
  created_at?: Date;
  updated_at?: Date;
}
