// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.apiService.getToken();
    if (token) {
      const decoded = this.apiService.decodeToken(token);
      if (decoded && decoded.exp > Date.now() / 1000) { 
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
