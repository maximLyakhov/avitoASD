import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('pending') ||
      request.url.includes('reject')  ||
      request.url.includes('approve') ||
      request.url.includes('Overview')
    ) {
      const data: { key: string, value: string} = JSON.parse(String(localStorage.getItem('data')));
      localStorage.getItem('data');
      const authReq = request.clone({
        headers: request.headers.set(data.key, data.value)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
