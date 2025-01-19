import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let guard: authGuard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authGuard] 
    });
    guard = TestBed.inject(authGuard); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call canActivate', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(guard.canActivate(route, state)).toBeInstanceOf(Promise); 
  });
});
