import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Fichaje } from './fichaje.model';

@Injectable({
  providedIn: 'root'
})
export class FichajesStateService {

  private _fichajeActual : Subject<Fichaje>;
  fichajeActual$ : Observable<Fichaje>;
  fichajeActual : Fichaje;

  private _cargando : Subject<boolean>;
  cargando : boolean;
  cargando$ : Observable<boolean>;

  private _ultimosFichajes : Subject<Array<any>>;
  ultimosFichajes : Array<any>;
  ultimosFichajes$ : Observable<Array<any>>;


  constructor() {
    this.initModels();
    this.initSubjects();
    this.initObservables();
    this.emitEvents();
  }

  initSubjects() {
    this._fichajeActual = new Subject();
    this._cargando = new Subject();
    this._ultimosFichajes = new Subject();
  }

  initModels() {
    this.fichajeActual = new Fichaje();
    this.cargando = false;
    this.ultimosFichajes = new Array<any>();
  }

  initObservables() {
    this.fichajeActual$ = this._fichajeActual.asObservable();
    this.cargando$ = this._cargando.asObservable();
    this.ultimosFichajes$ = this._ultimosFichajes.asObservable();
  }

  emitEvents() {
    this._cargando.next(this.cargando);
    this._fichajeActual.next(this.fichajeActual);
    this._ultimosFichajes.next(this.ultimosFichajes);
  }

  actualizarFichajeActual(fichaje: Fichaje) {
    Object.assign(this.fichajeActual, fichaje);
    this._fichajeActual.next(this.fichajeActual);
  }

  terminarJornada() {
    this.fichajeActual.status = 'CLOSED';
    this._fichajeActual.next(this.fichajeActual);
  }

  setCargando(c: boolean) {
    this.cargando = c;
    this._cargando.next(this.cargando);
  }

  actualizarUltimosFichajes(fichajes: Array<any>) {
    Object.assign(this.ultimosFichajes, fichajes);
    this._ultimosFichajes.next(this.ultimosFichajes);
  }

}
