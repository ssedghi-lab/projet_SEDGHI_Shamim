import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardManagementRoutingModule } from './card-management-routing.module';
import { CardFormComponent } from './card-form/card-form.component';

@NgModule({
  declarations: [],
    imports: [
    CommonModule,
    CardManagementRoutingModule,ReactiveFormsModule
  ]
})
export class CardManagementModule { }