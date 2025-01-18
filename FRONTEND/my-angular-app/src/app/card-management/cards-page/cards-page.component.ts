import { Component } from '@angular/core';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardListComponent } from '../card-list/card-list.component';
@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css',
  imports: [CardListComponent, CardFormComponent]
})
export class CardsPageComponent {

}
