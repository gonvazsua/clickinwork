import { Component, OnInit } from '@angular/core';
import { SlideInOut } from 'src/app/animaciones/slideInOut';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenService } from 'src/app/shared/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [SlideInOut]
})
export class LoginComponent implements OnInit {

  loginForm       : FormGroup
  cargando        : boolean
  incorrectLogin  : boolean

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService) {
    this.initLoginForm()
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.cargando = false
    this.incorrectLogin = false
  }

  checkLogin() {
    this.markFormAsTouched();
    this.ngOnInit()
    if(this.loginForm.valid)
      this.autenticar()
  }

  markFormAsTouched() {
    Object.keys(this.loginForm.controls).map(k => this.loginForm.controls[k].markAsTouched())
  }

  autenticar() {
    this.cargando = true
    this.authService.autenticar(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        loginOK => this.setLoginCorrecto(loginOK),
        error => this.setLoginIncorrecto())
  }

  setLoginCorrecto(token) {
    setTimeout(() => {
      this.cargando = false;
      console.log(token);
      this.tokenService.setToken(token.token);
      this.router.navigate(['main/fichajes'])
    }, 1500) 
  }

  setLoginIncorrecto() {
    setTimeout(() => {
      this.cargando = false
      this.incorrectLogin = true
    }, 1500)
    setTimeout(() => this.incorrectLogin = false, 5000)
  }

}
