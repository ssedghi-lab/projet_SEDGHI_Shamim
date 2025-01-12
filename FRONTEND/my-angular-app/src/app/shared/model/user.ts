
export interface User {
  id: string; // UUID
  username: string;
  password: string; // Optionnel pour des raisons de sécurité
  token?: string;  // Token JWT optionnel
}