import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../shared/model/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent implements OnInit {
  connectionForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  user?: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.apiService.getUserFromToken();
    if (userId) {
      this.apiService.getUser(userId).subscribe({
        next: (user: User | null) => {
          this.user = user ?? undefined;
          if (this.user) {
            this.router.navigate(['/product-list']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        },
      });
    }
  }

  connexion() {
    const username = this.connectionForm.get('username')?.value ?? '';
    const password = this.connectionForm.get('password')?.value ?? '';
    console.log('Tentative de connexion avec:', { username, password });
    this.apiService.loginClient(username, password).subscribe({
      next: (response) => {
        // Vérifier d'abord si response.body est non-null
        if (response.body) {
          const token = response.body.token;  // Assurez-vous que cette ligne corresponde à la structure de votre réponse
          if (token) {
            console.log('Token reçu:', token);
            this.apiService.setToken(token);
            this.router.navigate(['/product-list']);
          } else {
            console.error('Token non reçu:', response);
            alert('Login échoué. Aucun token reçu.');
          }
        } else {
          // Gérer le cas où response.body est null
          console.error('Réponse sans corps');
          alert('Erreur lors de la connexion: Aucune donnée reçue');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Informations de connexion invalides.');
      }
    });
  }
  

  
  deconnexion() {
    this.apiService.logout();
    this.user = undefined;
    // Naviguer vers la page de connexion après déconnexion
    this.router.navigate(['/login']);
  }
}
