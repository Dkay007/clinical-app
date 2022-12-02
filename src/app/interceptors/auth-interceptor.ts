import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.token$.pipe(map((token: string) => {          
          if (token) {
            request = request.clone({
              setHeaders: { 
                  Authorization: `Basic ${token}`
              }
          });
          }
         return request;
        }), switchMap((req) =>  next.handle(req)))       
    }
}