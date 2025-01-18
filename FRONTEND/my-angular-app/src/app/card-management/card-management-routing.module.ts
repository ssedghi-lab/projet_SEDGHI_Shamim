import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardFormComponent } from './card-form/card-form.component';
import { CardsPageComponent } from './cards-page/cards-page.component';
const routes: Routes = [
  { path: 'card', component: CardsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardManagementRoutingModule { }
