import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../../services/card-service.service';
import { Card } from '../models/card.model';
import { DirectivesDirective } from '../directives/directives.directive';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule , DirectivesDirective , CommonModule]
})
export class CardFormComponent {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      ccv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const newCard: Card = {
        id: Date.now(),
        ...this.cardForm.value,
      };
      this.cardService.addCarte(newCard);
      this.cardForm.reset();
    } 
  } 


  isFieldInvalid(fieldName: string): boolean {
    const field = this.cardForm.get(fieldName);
    return !!field && field.invalid && field.touched;
}

 
  
}