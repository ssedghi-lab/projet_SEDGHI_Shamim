
export interface User {
  id: string; // UUID
  username: string;
  password?: string; // Optionnel pour des raisons de sécurité
  mail: string;
  nom: string;
  prenom: string;
  created_at?: Date;
  updated_at?: Date;
}