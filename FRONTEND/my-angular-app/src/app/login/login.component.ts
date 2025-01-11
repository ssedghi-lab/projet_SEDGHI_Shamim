import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../shared/model/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const userId = this.apiService.getUserFromToken();
    if (userId) {
      this.apiService.getUser(userId).subscribe({
        next: (user: User | null) => {
          this.user = user ?? undefined;
          // Naviguer vers la liste des produits si l'utilisateur est déjà connecté
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
        console.log('Réponse du serveur:', response);
        const token = response.headers.get('Authorization')?.split(' ')[1];
        if (token) {
          this.apiService.setToken(token);
          this.user = response.body!;
          console.log('Login successful!');
          // Naviguer vers la liste des produits après une connexion réussie
          this.router.navigate(['/product-list']);
        } else {
          alert('Login échoué. Aucun token reçu.');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Informations de connexion invalides.');
      },
    });
  }

  deconnexion() {
    this.apiService.logout();
    this.user = undefined;
    // Naviguer vers la page de connexion après déconnexion
    this.router.navigate(['/login']);
  }
}
