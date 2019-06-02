import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FichajesService } from './fichajes.service';
import { Fichaje } from '../modelos/fichaje.model';
import { Evento } from '../modelos/evento.model';
import { TipoEvento } from '../modelos/tipo-evento.enum';
import { FichajeTotales } from '../modelos/fichaje-totales.model';

fdescribe('FichajeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FichajesService = TestBed.get(FichajesService);
    expect(service).toBeTruthy();
  });

  it('Should calculate total worked time only with hours', () => {
    const service: FichajesService = TestBed.get(FichajesService);
    const fichaje: Fichaje = new Fichaje();
    const eventoStart : Evento = new Evento();
    eventoStart.type = TipoEvento.START;
    eventoStart.time = new Date("2019-06-02T08:00:00.000Z");
    const eventoPause : Evento = new Evento();
    eventoPause.type = TipoEvento.PAUSE;
    eventoPause.time = new Date("2019-06-02T10:00:00.000Z");
    const eventoContinue : Evento = new Evento();
    eventoContinue.type = TipoEvento.CONTINUE;
    eventoContinue.time = new Date("2019-06-02T11:00:00.000Z");
    const eventoStop : Evento = new Evento();
    eventoStop.type = TipoEvento.STOP;
    eventoStop.time = new Date("2019-06-02T15:00:00.000Z");

    fichaje.time_events = new Array<Evento>();
    fichaje.time_events.push(eventoStart, eventoPause, eventoContinue, eventoStop);
    const fichajeTotal: FichajeTotales = service.enriquecerFichajesConTotales(fichaje);

    expect(fichajeTotal.totalTrabajado.getHours()).toBe(6);
    expect(fichajeTotal.totalTrabajado.getMinutes()).toBe(0);

  });

  it('Should calculate total worked time with hours and minutes', () => {
    const service: FichajesService = TestBed.get(FichajesService);
    const fichaje: Fichaje = new Fichaje();
    const eventoStart : Evento = new Evento();
    eventoStart.type = TipoEvento.START;
    eventoStart.time = new Date("2019-06-02T08:30:00.000Z");
    const eventoPause : Evento = new Evento();
    eventoPause.type = TipoEvento.PAUSE;
    eventoPause.time = new Date("2019-06-02T10:00:00.000Z");
    const eventoContinue : Evento = new Evento();
    eventoContinue.type = TipoEvento.CONTINUE;
    eventoContinue.time = new Date("2019-06-02T10:10:00.000Z");
    const eventoStop : Evento = new Evento();
    eventoStop.type = TipoEvento.STOP;
    eventoStop.time = new Date("2019-06-02T15:10:00.000Z");

    fichaje.time_events = new Array<Evento>();
    fichaje.time_events.push(eventoStart, eventoPause, eventoContinue, eventoStop);
    const fichajeTotal: FichajeTotales = service.enriquecerFichajesConTotales(fichaje);

    expect(fichajeTotal.totalTrabajado.getHours()).toBe(6);
    expect(fichajeTotal.totalTrabajado.getMinutes()).toBe(30);

  });

});
