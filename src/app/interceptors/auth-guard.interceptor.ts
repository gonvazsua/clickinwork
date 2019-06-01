import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../shared/token/token.service';

@Injectable()
export class AuthGuardInterceptor implements CanActivate {

  constructor(public tokenService: TokenService, public router: Router) {}
  
  canActivate(): boolean {

    if (!this.tokenService.isLoggedIn()) {
      
        this.router.navigate(['']);
        return false;

    }

    return true;
  }
}