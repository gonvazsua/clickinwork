import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/token/token.service';
import { HttpClient } from '@angular/common/http';
import { urls } from '../urls';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {

  }

  autenticar(email, password): Observable<any> {
    const payload = {
      email : email,
      password : btoa(password)
    };
    return this.http.post(urls.login, payload).pipe(catchError(err => this.handleError()))
/*
    return new Observable(observer => {
      if(email === "test@test.com" && password === "1234") {
        this.tokenService.setToken("mitoken")
        observer.next()
      } else {
        observer.error()
      }
      observer.complete()
    })
*/
  }

  logout() {
    this.tokenService.clearSession()
  }

  recuperarPassword(email) : Observable<any> {
    return new Observable(observer => {
      if(email === 'a@a.com') {
        observer.next(true)
      } else 
        observer.error('Error')
      observer.complete()
    })
  }

  private handleError () {
    return new Observable(observer => {
      observer.error()
      observer.complete()
    })
  }

}
