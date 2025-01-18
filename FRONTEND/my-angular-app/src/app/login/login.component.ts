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
            this.router.navigate(['/products']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        },
      });
    }
  }
  connexion() {
    const username = this.connectionForm.get('username')?.value || '';
    const password = this.connectionForm.get('password')?.value || '';
    this.apiService.loginClient(username, password).subscribe({
      next: (response) => {
        if (response.body?.token) {
          const token = response.body.token;
          this.apiService.setToken(token);
          this.router.navigate(['/products']); // Route corrigée
        } else {
          alert('Login échoué.');
        }
      },
      error: () => alert('Informations de connexion invalides.')
    });
  }
  

  
  deconnexion() {
    this.apiService.logout();
    this.user = undefined;
    // Naviguer vers la page de connexion après déconnexion
    this.router.navigate(['/login']);
  }
}
