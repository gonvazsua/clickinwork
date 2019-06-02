import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Fichaje } from './modelos/fichaje.model';
import { EstadoJornada } from './modelos/estado-jornada.enum';
import { FichajeTotales } from './modelos/fichaje-totales.model';

@Injectable({
  providedIn: 'root'
})
export class FichajesStateService {

  _fichajeActual : BehaviorSubject<Fichaje>;
  fichajeActual$ : Observable<Fichaje>;
  fichajeActual : Fichaje;

  _fichajeAConsultar : BehaviorSubject<Fichaje>;
  fichajeAConsultar$ : Observable<Fichaje>;
  fichajeAConsultar : Fichaje;

  _cargando : BehaviorSubject<boolean>;
  cargando : boolean;
  cargando$ : Observable<boolean>;

  _ultimosFichajes : BehaviorSubject<Array<FichajeTotales>>;
  ultimosFichajes : Array<FichajeTotales>;
  ultimosFichajes$ : Observable<Array<FichajeTotales>>;

  _estadoJornada : BehaviorSubject<EstadoJornada>;
  estadoJornada: EstadoJornada;
  estadoJornada$ : Observable<EstadoJornada>;


  constructor() {
    this.initModels();
    this.initSubjects();
    this.initObservables();
  }

  initSubjects() {
    this._fichajeActual = new BehaviorSubject(this.fichajeActual);
    this._fichajeAConsultar = new BehaviorSubject(this.fichajeAConsultar);
    this._cargando = new BehaviorSubject(this.cargando);
    this._ultimosFichajes = new BehaviorSubject(this.ultimosFichajes);
    this._estadoJornada = new BehaviorSubject(this.estadoJornada);
  }

  initModels() {
    this.fichajeActual = new Fichaje();
    this.fichajeAConsultar = new Fichaje();
    this.cargando = false;
    this.ultimosFichajes = new Array<FichajeTotales>();
    this.estadoJornada = null;
  }

  initObservables() {
    this.fichajeActual$ = this._fichajeActual.asObservable();
    this.fichajeAConsultar$ = this._fichajeActual.asObservable();
    this.cargando$ = this._cargando.asObservable();
    this.ultimosFichajes$ = this._ultimosFichajes.asObservable();
    this.estadoJornada$ = this._estadoJornada.asObservable();
  }

}
