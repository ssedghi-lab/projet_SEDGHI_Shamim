import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] }, 
  {path: '**', component: LoginFormComponent}
];


