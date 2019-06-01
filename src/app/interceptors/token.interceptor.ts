import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { TokenService } from '../shared/token/token.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = this.tokenService.isLoggedIn()
        ? { 'Authorization' : this.tokenService.getToken() }
        : {}

    const updatedReq = request.clone({ setHeaders: headers })

    return next.handle(updatedReq)
    
  }
}