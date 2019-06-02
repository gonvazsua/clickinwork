import { Injectable } from '@angular/core';
import { FichajesStateService } from './fichajes-state.service';
import { Fichaje } from './modelos/fichaje.model';
import { FichajeTotales } from './modelos/fichaje-totales.model';
import { EstadoJornada } from './modelos/estado-jornada.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichajesActionService {

  constructor(private fichajesState: FichajesStateService) { }

  setFichajeActual(fichaje: Fichaje) {
    this.fichajesState.fichajeActual = fichaje;
    this.fichajesState._fichajeActual.next(fichaje);
  }

  setFichajeAConsultar(fichaje: FichajeTotales) {
    this.fichajesState.fichajeAConsultar = fichaje;
    this.fichajesState._fichajeAConsultar.next(fichaje);
  }

  setEstadoJornada(estadoJornada: EstadoJornada) {
    this.fichajesState.estadoJornada = estadoJornada;
    this.fichajesState._estadoJornada.next(estadoJornada);
  }

  setCargando(cargando: boolean) {
    this.fichajesState.cargando = cargando;
    this.fichajesState._cargando.next(cargando);
  }

  setUltimosFichajes(fichajes: Array<FichajeTotales>) {
    this.fichajesState.ultimosFichajes = fichajes;
    this.fichajesState._ultimosFichajes.next(fichajes);
  }

}
