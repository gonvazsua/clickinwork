import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { MenuComponent } from './menu/menu.component';
import { FichajesComponent } from './fichajes/fichajes.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { 
    path : '', 
    component : MenuComponent,
    children : [
      { path : 'fichajes', component : FichajesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }