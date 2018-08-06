import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from 'app/core/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService: any = this.inj.get(AuthService);

    if (!authService.getToken()) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });

    return next.handle(req);
  }
}
