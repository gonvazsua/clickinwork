import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router : Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        return next
            .handle(request)
            .pipe(
                tap(
                    event => {},
                    err => {
                        if (err instanceof HttpErrorResponse && this.unauthorizedAccess(err.status)){
                            this.authService.logout()
                            this.router.navigate([''])
                        }
                    })
            )
    }

    private unauthorizedAccess(httpStatus) {
        return httpStatus === 403 || httpStatus === 401
    }
}