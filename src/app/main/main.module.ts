import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FichajesComponent } from './fichajes/fichajes.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error/error.component';
import { FichajesService } from './fichajes/fichajes.service';
import { FichajesStateService } from './fichajes/fichajes-state.service';
import { FichajeEventoComponent } from './fichajes/fichaje-evento/fichaje-evento.component';

@NgModule({
  declarations: [MenuComponent, FichajesComponent, ErrorComponent, FichajeEventoComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule.forRoot()
  ],
  providers : [
    FichajesService,
    FichajesStateService
  ]
})
export class MainModule { }
