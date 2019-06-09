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

  enriqueceFichaje(llamadaHttp: Observable<Fichaje>): Observable<Fichaje> {
    return llamadaHttp.pipe(
      map(fichaje => {
        const fichajeEnriquecido = this.enriquecerFichajesConTotales(fichaje);
        return fichajeEnriquecido;
      })
    )
  }

  cargarFichajeActual(): Observable<Fichaje> {
    return this.enriqueceFichaje(this.http.get<Fichaje>(this.URL_CURRENT));
  }

  empezarJornada(): Observable<Fichaje> {
    return this.enriqueceFichaje(this.http.post<Fichaje>(this.URL_START, {}));
  }

  hacerPausa(): Observable<Fichaje> {
    return this.enriqueceFichaje(this.http.post<Fichaje>(this.URL_PAUSE, {}));
  }

  continuarJornada(): Observable<Fichaje> {
    return this.enriqueceFichaje(this.http.post<Fichaje>(this.URL_CONTINUE, {}));
  }

  terminarJornada(): Observable<Fichaje> {
    return this.enriqueceFichaje(this.http.post<Fichaje>(this.URL_FINISH, {}));
  }

  cargarUltimosFichajes(): Observable<Array<FichajeTotales>> {
    return this.http.get<Array<any>>(this.URL_LAST_TC)
      .pipe(
        map(fichajes => {
          return fichajes.map(f => this.enriquecerFichajesConTotales(f));
        })
      );
  }

  /**
   * Devuelve los eventos de tipo CONTINUE y PAUSE ordenados
   * @param eventos 
   */
  obtenerEventosIntermedios(eventos: Array<Evento>): Array<Evento> {
    return eventos
        .filter((e:Evento) => e.type === TipoEvento.CONTINUE || e.type === TipoEvento.PAUSE)
        .sort((e1:Evento, e2:Evento) => { return +new Date(e1.time) - +new Date(e2.time) });
  }

    /**
   * Obtiene eventos ordenados
   * @param fichaje 
   */
  getSortedEvents(fichaje: Fichaje): Array<Evento> {
    const sorted = new Array<Evento>();
    Object.assign(sorted, fichaje.time_events);
    return sorted
        .sort((e1, e2) => e1.time > e2.time ? 1 : e1.time < e2.time ? -1 : 0)
  }

  calcularEstadoJornada(fichaje: Fichaje): EstadoJornada {
    if(this.isNotStarted(fichaje)) return EstadoJornada.NO_EMPEZADA;
    else if(this.isStarted(fichaje) || this.isResumed(fichaje)) return EstadoJornada.EMPEZADA;
    else if(this.isPaused(fichaje)) return EstadoJornada.PAUSADA;
    else return EstadoJornada.TERMINADA;
  }

  isNotStarted(fichaje: Fichaje): boolean {
    return fichaje.time_events === null || fichaje.time_events.length === 0;
  }

  isPaused(fichaje: Fichaje): boolean {
    const lastEvent = this.getLastEvent(fichaje);
    return lastEvent.type === TipoEvento.PAUSE;
  }

  isResumed(fichaje: Fichaje): boolean {
      const lastEvent = this.getLastEvent(fichaje);
      return lastEvent.type === TipoEvento.CONTINUE;
  }

  getLastEvent(fichaje: Fichaje): Evento {
      return this.getSortedEvents(fichaje).pop() || new Evento();
  }

  isStarted(fichaje: Fichaje): boolean {
    const lastEvent = this.getLastEvent(fichaje);  
    return fichaje.status === FichajeStatus.OPEN 
        && lastEvent.type === TipoEvento.START;
  }

  isStopped(fichaje: Fichaje): boolean {
      return fichaje.status === FichajeStatus.CLOSED 
        && this.getSortedEvents(fichaje).find(e => e.type === TipoEvento.STOP) ? true : false;
  }

  enriquecerFichajesConTotales(fichaje: Fichaje) : FichajeTotales {
    const fichajeTotales = new FichajeTotales(fichaje);
    
    const eventoStart = fichaje.time_events.find(e => e.type === TipoEvento.START);
    fichajeTotales.comienzo = eventoStart ? new Date(eventoStart.time) : null;
    
    const eventoStop = fichaje.time_events.find(e => e.type === TipoEvento.STOP);
    fichajeTotales.fin = eventoStop ? new Date(eventoStop.time) : null;
    
    const totales: {'minsTrabajado': number, 'minsPausado': number, 'ultimaHora': Date} = this.calcularTotalesEnMinutos(fichaje.time_events);
    fichajeTotales.totalPausas = this.dateFactory.minutosADate(totales.minsPausado);
    fichajeTotales.totalTrabajado = this.dateFactory.minutosADate(totales.minsTrabajado);
    fichajeTotales.total = this.dateFactory.minutosADate(totales.minsPausado + totales.minsTrabajado);
    fichajeTotales.eventosIntermedios = this.obtenerEventosIntermedios(fichaje.time_events);

    return fichajeTotales;
  }

  calcularTotalesEnMinutos(time_events): {'minsTrabajado': number, 'minsPausado': number, 'ultimaHora': Date} {

    if(time_events === null || time_events.length === 0) return {'minsTrabajado': 0, 'minsPausado': 0, 'ultimaHora': null};
    else {
      const totales: {'minsTrabajado': number, 'minsPausado': number, 'ultimaHora': Date} = time_events
      .map((e: Evento) => {e.time = new Date(e.time); return e; })
      .sort((e1, e2) => e1.time > e2.time ? 1 : e1.time < e2.time ? -1 : 0) //Ascendente
      .reverse()
      .reduce((acum: {'minsTrabajado': number, 'minsPausado': number, 'ultimaHora': Date}, curr: Evento) => {
        acum = acum || {'minsTrabajado': 0, 'minsPausado': 0, 'ultimaHora': new Date()/*curr.time*/};
        
        const totalTrabajado = curr.type === TipoEvento.CONTINUE || curr.type === TipoEvento.START
          ? acum.minsTrabajado + this.dateFactory.calcularDiferenciaEnMinutos(acum.ultimaHora, curr.time)
          : acum.minsTrabajado;

        const totalPausado = curr.type === TipoEvento.PAUSE
          ? acum.minsPausado + this.dateFactory.calcularDiferenciaEnMinutos(acum.ultimaHora, curr.time)
          : acum.minsPausado;

        acum.minsTrabajado = totalTrabajado
        acum.minsPausado = totalPausado;
        acum.ultimaHora = curr.time;
        return acum;
      }, null);
      return totales;
    }

  }

}
