import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  jwtToken: string = '';
  constructor(private apiService:ApiService) {}
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.jwtToken = this.apiService.getToken()!;

    if (this.jwtToken != '') {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}` },
      });
      console.log('Bearer renvoyé : ' + this.jwtToken);
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          let tab: Array<string>;
          let enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization != null) {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.apiService.setToken(tab[1]);
              console.log('Bearer récupéré : ' + this.jwtToken);
            }
          }
        }
      })
    );
  }
}