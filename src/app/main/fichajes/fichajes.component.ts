import { Component, OnInit } from '@angular/core';
import { FichajesService } from './fichaje-service/fichajes.service';
import { Observable } from 'rxjs';
import { Fichaje } from './modelos/fichaje.model';
import { FichajesStateService } from './fichajes-state.service';
import { TipoEvento } from './modelos/tipo-evento.enum';
import { Evento } from './modelos/evento.model';
import { FichajeTotales } from './modelos/fichaje-totales.model';
import { FichajesActionService } from './fichajes-action.service';
import { EstadoJornada } from './modelos/estado-jornada.enum';

@Component({
  selector: 'app-fichajes',
  templateUrl: './fichajes.component.html',
  styleUrls: ['./fichajes.component.css']
})
export class FichajesComponent implements OnInit {

  private hoy            : number;

  constructor(private fichajesService: FichajesService, 
    private fichajesState : FichajesStateService, private fichajesAction: FichajesActionService) { 
    this.hoy = Date.now();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.fichajesService.cargarFichajeActual()
      .subscribe(fichaje => {
        this.fichajesAction.setFichajeActual(fichaje);
        this.actualizarEstadosPantalla(fichaje);
      });
    this.obtenerUltimosFichajes();
  }
  
  empezarJornada(){
    this.fichajesAction.setCargando(true);
    setTimeout(() => {
      this.fichajesService.empezarJornada()
      .subscribe((fichaje : Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesAction.setCargando(false);
      });
    }, 1500);
  }

  hacerPausa() {
    this.fichajesAction.setCargando(true);
    setTimeout(() => {
      this.fichajesService.hacerPausa()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesAction.setCargando(false);
      });
    }, 1500);
  }

  reanudarJornada() {
    this.fichajesAction.setCargando(true);
    setTimeout(() => {
      this.fichajesService.continuarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesAction.setCargando(false);
      });
    }, 1500);
  }

  terminarJornada() {
    this.fichajesAction.setCargando(true);
    setTimeout(() => {
      this.fichajesService.terminarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesAction.setCargando(false);
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

  obtenerUltimosFichajes() {
    this.fichajesAction.setCargando(true);
    setTimeout(() => {
      this.fichajesService.cargarUltimosFichajes()
        .subscribe((ultimosFichajes: Array<any>) => {
          this.fichajesAction.setUltimosFichajes(ultimosFichajes);
          this.fichajesAction.setCargando(false);
        });
    }, 1500);
  }

  actualizarFichajeTotales(fichaje: Fichaje) {
    const fichajeTotales = this.fichajesService.enriquecerFichajesConTotales(fichaje);
    console.log(fichajeTotales);
    this.fichajesAction.setFichajeAConsultar(fichajeTotales);
  }

  actualizarEstadoJornada(fichaje: Fichaje) {
    const estadoJornada: EstadoJornada = this.fichajesService.calcularEstadoJornada(fichaje);
    console.log(estadoJornada);
    this.fichajesAction.setEstadoJornada(estadoJornada);
  }

  actualizarEstadosPantalla(fichaje: Fichaje) {
    this.fichajesAction.setFichajeActual(fichaje);
    this.actualizarFichajeTotales(fichaje);
    this.actualizarEstadoJornada(fichaje);
  }

}
