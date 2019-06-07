import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Fichaje } from './modelos/fichaje.model';
import { EstadoJornada } from './modelos/estado-jornada.enum';
import { FichajeTotales } from './modelos/fichaje-totales.model';

@Injectable({
  providedIn: 'root'
})
export class FichajesStateService {

  private readonly _fichajeActual = new BehaviorSubject<Fichaje>(null);
  readonly fichajeActual$ : Observable<Fichaje> = this._fichajeActual.asObservable();

  private readonly _fichajeAConsultar = new BehaviorSubject<Fichaje>(null);
  readonly fichajeAConsultar$ : Observable<Fichaje> = this._fichajeAConsultar.asObservable();

  private readonly _cargando = new BehaviorSubject<boolean>(false);
  readonly cargando$ : Observable<boolean> = this._cargando.asObservable();

  private readonly _ultimosFichajes = new BehaviorSubject<Array<FichajeTotales>>([]);
  readonly ultimosFichajes$ : Observable<Array<FichajeTotales>> = this._ultimosFichajes.asObservable();

  private readonly _estadoJornada = new BehaviorSubject<EstadoJornada>(null);
  readonly estadoJornada$ : Observable<EstadoJornada> = this._estadoJornada.asObservable();

  get fichajeActual(): Fichaje {
    return this._fichajeActual.getValue();
  }

  set fichajeActual(fichaje: Fichaje) {
    this._fichajeActual.next(fichaje);
  }

  get fichajeAConsultar(): Fichaje {
    return this._fichajeAConsultar.getValue();
  }

  set fichajeAConsultar(fichaje: Fichaje) {
    this._fichajeAConsultar.next(fichaje);
  }

  get cargando(): boolean {
    return this._cargando.getValue();
  }

  set cargando(cargando: boolean) {
    this._cargando.next(cargando);
  }

  get ultimosFichajes(): Array<FichajeTotales> {
    return this._ultimosFichajes.getValue();
  }

  set ultimosFichajes(fichajes: Array<FichajeTotales>) {
    this._ultimosFichajes.next(fichajes);
  }

  get estadoJornada(): EstadoJornada {
    return this._estadoJornada.getValue();
  }

  set estadoJornada(estado: EstadoJornada) {
    this._estadoJornada.next(estado);
  }

}
