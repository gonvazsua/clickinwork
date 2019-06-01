import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { TokenService } from '../shared/token/token.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule.forRoot()
  ],
  providers: [
    AuthService,
    TokenService
  ]
})
export class LoginModule { }
