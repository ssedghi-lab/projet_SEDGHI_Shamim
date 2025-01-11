import { provideRouter } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { routes } from './app.routes';
import { PanierState } from './shared/states/panier.state';
import { NgxsModule } from '@ngxs/store';
export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([PanierState])),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi:true
    }
  ]
};