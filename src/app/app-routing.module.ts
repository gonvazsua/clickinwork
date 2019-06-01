import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardInterceptor } from './interceptors/auth-guard.interceptor';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'main', loadChildren: './main/main.module#MainModule', canActivate : [AuthGuardInterceptor] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
