import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Fichaje } from './fichaje.model';
import { Observable } from 'rxjs';
import { FichajesStateService } from './fichajes-state.service';
import { map, toArray, first } from 'rxjs/operators';
import { TipoEvento } from './tipo-evento.enum';

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

  constructor(private http: HttpClient, private fichajesState: FichajesStateService) { }

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

  cargarUltimosFichajes(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.URL_LAST_TC)
      .pipe(
        map(fichajes => {
          fichajes.map(f => {
            f["from"] = f.time_events.find(e => e.type === TipoEvento.START);
            f["to"] = f.time_events.find(e => e.type === TipoEvento.STOP);
            const diff = +new Date(f["to"].time) - +new Date(f["from"].time);
            const totalDate = new Date(diff);
            totalDate.setHours(totalDate.getHours() - 1);
            f["total"] = totalDate.getTime();
          });
          return fichajes;
        })
      );
  }

}
