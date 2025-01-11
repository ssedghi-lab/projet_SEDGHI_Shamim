import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
 imports: [CommonModule , ReactiveFormsModule]

})
export class RegistrationComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService, // Injection du service ici
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
  
      const user = { username, password }; // Assurez-vous que les champs correspondent à ceux attendus par le backend
  
      this.apiService.addUser(user).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur lors de l’inscription', err);
        },
      });
    }
  }
  
}  
