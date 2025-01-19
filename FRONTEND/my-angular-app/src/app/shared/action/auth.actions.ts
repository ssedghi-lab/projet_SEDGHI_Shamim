// auth.actions.ts

// Définir une action pour la connexion
export class Login {
    static readonly type = '[Auth] Login'; 
    constructor(public payload: { token: string, username: string }) {} // Payload contient le token JWT et le nom d'utilisateur
  }
  
  // Définir une action pour la déconnexion
  export class Logout {
    static readonly type = '[Auth] Logout'; // Nom de l'action
  }
  