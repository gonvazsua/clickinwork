import { Component, OnInit } from '@angular/core';
import { FichajesService } from './fichajes.service';
import { Observable } from 'rxjs';
import { Fichaje } from './fichaje.model';
import { FichajesStateService } from './fichajes-state.service';
import { TipoEvento } from './tipo-evento.enum';
import { Evento } from './evento.model';

@Component({
  selector: 'app-fichajes',
  templateUrl: './fichajes.component.html',
  styleUrls: ['./fichajes.component.css']
})
export class FichajesComponent implements OnInit {

  private hoy            : number;
  private isStarted      : boolean;
  private isPaused       : boolean;
  private isResumed      : boolean;
  private isStopped      : boolean;
  private startEvent     : Evento;
  private stopEvent      : Evento;
  private eventosIntermedios : Array<Evento>;

  constructor(private fichajesService: FichajesService, private fichajesState : FichajesStateService) { 
    this.hoy = Date.now();
    this.eventosIntermedios = new Array();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.fichajesService.cargarFichajeActual()
      .subscribe(fichaje => {
        this.fichajesState.actualizarFichajeActual(fichaje);
      });
    this.updateFlags();
    this.obtenerEventos();
    this.obtenerUltimosFichajes();
  }

  updateFlags() {
    this.fichajesState.fichajeActual$.subscribe(fc => {
      console.log(fc);
      this.isStarted = fc.isStarted() && !fc.isStopped();
      this.isPaused = fc.isPaused() && !fc.isStopped();
      this.isResumed = fc.isResumed() && !fc.isStopped();
      this.isStopped = fc.isStopped();
    })    
  }
  
  empezarJornada(){
    this.fichajesState.setCargando(true);
    setTimeout(() => {
      this.fichajesService.empezarJornada()
      .subscribe((fichaje : Fichaje) => {
        this.fichajesState.actualizarFichajeActual(fichaje);
        this.fichajesState.setCargando(false);
      });
    }, 1500);
  }

  hacerPausa() {
    this.fichajesState.setCargando(true);
    setTimeout(() => {
      this.fichajesService.hacerPausa()
      .subscribe((fichaje: Fichaje) => {
        this.fichajesState.actualizarFichajeActual(fichaje);
        this.fichajesState.setCargando(false);
      });
    }, 1500);
  }

  reanudarJornada() {
    this.fichajesState.setCargando(true);
    setTimeout(() => {
      this.fichajesService.continuarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.fichajesState.actualizarFichajeActual(fichaje);
        this.fichajesState.setCargando(false);
      });
    }, 1500);
  }

  terminarJornada() {
    this.fichajesState.setCargando(true);
    setTimeout(() => {
      this.fichajesService.terminarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.fichajesState.actualizarFichajeActual(fichaje);
        this.fichajesState.setCargando(false);
      });
    }, 1500);
  }

  handleClick(event) {
    switch(event) {
      case TipoEvento.START: {
        this.empezarJornada();
        break;
      }
      case TipoEvento.PAUSE: {
        this.hacerPausa();
        break;
      }
      case TipoEvento.CONTINUE: {
        this.reanudarJornada();
        break;
      }
      case TipoEvento.STOP: {
        this.terminarJornada();
        break;
      }
      default: {
        break;
      }
    }
  }

  obtenerEventos() {
    this.fichajesState.fichajeActual$.subscribe(fc => {
      this.startEvent = fc.time_events.find(e => e.type === TipoEvento.START);
      this.stopEvent = fc.time_events.find(e => e.type === TipoEvento.STOP);
      this.eventosIntermedios = fc.time_events
        .filter(e => e.type === TipoEvento.CONTINUE || e.type === TipoEvento.PAUSE)
        .sort((e1, e2) => { return +new Date(e1.time) - +new Date(e2.time) });
    })
  }

  obtenerUltimosFichajes() {
    this.fichajesState.setCargando(true);
    setTimeout(() => {
      this.fichajesService.cargarUltimosFichajes()
        .subscribe((ultimosFichajes: Array<any>) => {
          this.fichajesState.actualizarUltimosFichajes(ultimosFichajes);
          this.fichajesState.setCargando(false);
        });
    }, 1500);
  }

}
