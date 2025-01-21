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
    const userId = this.authService.getToken();
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

  onSubmit() {
    const username = this.connectionForm.get('username')?.value ?? '';
    const password = this.connectionForm.get('password')?.value ?? '';
  
    if (this.connectionForm.valid) {
      this.authService.loginUser({ username, password }).subscribe({
        next: (res) => {
          if (res.token) {
            this.authService.setToken(res.token);
            this.router.navigate(['/products']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la connexion', err);
        },
      });
    }
  }
  
  deconnexion() {
    this.authService.logout();
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
