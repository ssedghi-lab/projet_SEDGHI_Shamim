import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guards/auth.guard'; 
import { PanierComponent } from './panier/panier.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CardManagementModule } from './card-management/card-management.module';
import { CardsPageComponent } from './card-management/cards-page/cards-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'panier', component: PanierComponent },
  { path: 'products', component: CatalogueComponent },
  { path: 'cards', component: CardsPageComponent },
  { path: '**', component: CatalogueComponent }
];


