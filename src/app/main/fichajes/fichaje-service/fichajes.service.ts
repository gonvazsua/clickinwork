import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Fichaje } from '../modelos/fichaje.model';
import { Observable } from 'rxjs';
import { FichajesStateService } from '../fichajes-state.service';
import { map, toArray, first } from 'rxjs/operators';
import { TipoEvento } from '../modelos/tipo-evento.enum';
import { DateFactoryService } from 'src/app/shared/date-factory/date-factory.service';
import { FichajeTotales } from '../modelos/fichaje-totales.model';
import { Evento } from '../modelos/evento.model';
import { EstadoJornada } from '../modelos/estado-jornada.enum';
import { FichajeStatus } from '../modelos/fichaje-status.enum';

@Injectable({
  providedIn: 'root'
})
export class FichajesService {

  private URL_FICHAJES : string = environment.api + "timeControl";
  private URL_CURRENT  : string = this.URL_FICHAJES + '/current';
  private URL_START    : string = this.URL_FICHAJES + '/start';
  private URL_PAUSE    : string = this.URL_FICHAJES + '/pause';
  private URL_CONTINUE : string = this.URL_FICHAJES + '/continue';
  private URL_FINISH   : string = this.URL_FICHAJES + '/finish';
  private URL_LAST_TC  : string = this.URL_FICHAJES + '/last';

  constructor(private http: HttpClient, 
    private dateFactory: DateFactoryService) { }

  cargarFichajeActual(): Observable<Fichaje> {
    return this.http.get<Fichaje>(this.URL_CURRENT);
  }

  empezarJornada(): Observable<Fichaje> {
    return this.http.post<Fichaje>(this.URL_START, {});
  }

  hacerPausa(): Observable<Fichaje> {
    return this.http.post<Fichaje>(this.URL_PAUSE, {});
  }

  continuarJornada(): Observable<Fichaje> {
    return this.http.post<Fichaje>(this.URL_CONTINUE, {});
  }

  terminarJornada(): Observable<Fichaje> {
    return this.http.post<Fichaje>(this.URL_FINISH, {});
  }

  cargarUltimosFichajes(): Observable<Array<FichajeTotales>> {
    return this.http.get<Array<any>>(this.URL_LAST_TC)
      .pipe(
        map(fichajes => {
          return fichajes.map(f => this.enriquecerFichajesConTotales(f));
        })
      );
  }


  enriquecerFichajesConTotales(fichaje: Fichaje) : FichajeTotales {
    const fichajeTotales = new FichajeTotales(fichaje);
    const eventoStart = fichaje.time_events.find(e => e.type === TipoEvento.START);
    fichajeTotales.comienzo = eventoStart ? new Date(eventoStart.time) : null;
    
    const eventoStop = fichaje.time_events.find(e => e.type === TipoEvento.STOP);
    fichajeTotales.fin = eventoStop ? new Date(eventoStop.time) : new Date();

    const total = this.dateFactory.getDiffInHours(fichajeTotales.fin, fichajeTotales.comienzo);

    const pausas = fichaje.time_events
      .filter(e => e.type === TipoEvento.PAUSE || e.type === TipoEvento.CONTINUE)
      .map((e: Evento) => {e.time = new Date(e.time); return e; })
      .sort((e1, e2) => e1.time > e2.time ? 1 : e1.time < e2.time ? -1 : 0) //Ascendente
      .reverse()
      .reduce((acum: Date, curr: Evento) => {
        return acum === null 
          ? curr.time
          : this.dateFactory.getDiffInHours(acum, curr.time);
      }, null);
    
    fichajeTotales.totalPausas = pausas;
    fichajeTotales.totalTrabajado = this.dateFactory.getDiffInHours(total, pausas);
    fichajeTotales.eventosIntermedios = this.obtenerEventosIntermedios(fichaje.time_events);
    return fichajeTotales;
  }

  obtenerEventosIntermedios(eventos: Array<Evento>): Array<Evento> {
    return eventos
        .filter((e:Evento) => e.type === TipoEvento.CONTINUE || e.type === TipoEvento.PAUSE)
        .sort((e1:Evento, e2:Evento) => { return +new Date(e1.time) - +new Date(e2.time) });
  }

  calcularEstadoJornada(fichaje: Fichaje): EstadoJornada {
    if(this.isNotStarted(fichaje)) return EstadoJornada.NO_EMPEZADA;
    else if(this.isStarted(fichaje) || this.isResumed(fichaje)) return EstadoJornada.EMPEZADA;
    else if(this.isPaused(fichaje)) return EstadoJornada.PAUSADA;
    else return EstadoJornada.TERMINADA;
  }

  isPaused(fichaje: Fichaje): boolean {
    const lastEvent = this.getLastEvent(fichaje);
    return lastEvent.type === TipoEvento.PAUSE;
  }

  isResumed(fichaje: Fichaje): boolean {
      const lastEvent = this.getLastEvent(fichaje);
      return lastEvent.type === TipoEvento.START || lastEvent.type === TipoEvento.CONTINUE;
  }

  getSortedEvents(fichaje: Fichaje): Array<Evento> {
      const sorted = new Array<Evento>();
      Object.assign(sorted, fichaje.time_events);
      return sorted
          .sort((e1, e2) => e1.time > e2.time ? 1 : e1.time < e2.time ? -1 : 0)
  }

  getLastEvent(fichaje: Fichaje): Evento {
      return this.getSortedEvents(fichaje).pop() || new Evento();
  }

  isStarted(fichaje: Fichaje): boolean {
      return this.getSortedEvents(fichaje).find(e => e.type === TipoEvento.START) ? true : false;
  }

  isStopped(fichaje: Fichaje): boolean {
      return this.getSortedEvents(fichaje).find(e => e.type === TipoEvento.STOP) ? true : false;
  }

  isNotStarted(fichaje: Fichaje): boolean {
    return fichaje.time_events === null || fichaje.time_events.length === 0;
  }

}
