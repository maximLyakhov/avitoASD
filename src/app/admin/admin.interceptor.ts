import { AdminService } from './admin.service';
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
  key = '';
  value = '';
  constructor(
    private service: AdminService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set(this.service.key, this.service.value)
    });
    console.log('authReq: ', authReq);
    return next.handle(authReq);
  }
}
