import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token) {
    localStorage.setItem('seigarbost-token', token);
  }

  getToken() {
    return localStorage.getItem('seigarbost-token');
  }

  isLoggedIn() {
    return localStorage.getItem('seigarbost-token') !== null;
  }

  clearSession() {
    localStorage.clear();
  }

}
