import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { PanierState } from './app/shared/states/panier.state';
import { NgxsModule } from '@ngxs/store';

bootstrapApplication(AppComponent, {providers: [...appConfig.providers,provideHttpClient(),
  importProvidersFrom(NgxsModule.forRoot([PanierState])),
  
]})
  .catch((err) => console.error(err));
  