import { Component, OnInit } from '@angular/core';
import { FichajesService } from './fichaje-service/fichajes.service';
import { Observable } from 'rxjs';
import { Fichaje } from './modelos/fichaje.model';
import { FichajesStateService } from './fichajes-state.service';
import { TipoEvento } from './modelos/tipo-evento.enum';
import { Evento } from './modelos/evento.model';
import { FichajeTotales } from './modelos/fichaje-totales.model';
import { EstadoJornada } from './modelos/estado-jornada.enum';

@Component({
  selector: 'app-fichajes',
  templateUrl: './fichajes.component.html',
  styleUrls: ['./fichajes.component.css']
})
export class FichajesComponent implements OnInit {

  private hoy            : number;

  constructor(private fichajesService: FichajesService, private fichajesState : FichajesStateService) { 
    this.hoy = Date.now();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.fichajesService.cargarFichajeActual()
      .subscribe((fichaje: Fichaje) => {
        this.fichajesState.fichajeActual = fichaje;
        console.log(fichaje);
        this.actualizarEstadosPantalla(fichaje);
        
      });
    //this.obtenerUltimosFichajes();
  }
  
  empezarJornada(){
    this.fichajesState.cargando = true;
    setTimeout(() => {
      this.fichajesService.empezarJornada()
      .subscribe((fichaje : Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesState.cargando = false;
      });
    }, 1500);
  }

  hacerPausa() {
    this.fichajesState.cargando = true;
    setTimeout(() => {
      this.fichajesService.hacerPausa()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesState.cargando = false;
      });
    }, 1500);
  }

  reanudarJornada() {
    this.fichajesState.cargando = true;
    setTimeout(() => {
      this.fichajesService.continuarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesState.cargando = false;
      });
    }, 1500);
  }

  terminarJornada() {
    this.fichajesState.cargando = true;
    setTimeout(() => {
      this.fichajesService.terminarJornada()
      .subscribe((fichaje: Fichaje) => {
        this.actualizarEstadosPantalla(fichaje);
        this.fichajesState.cargando = false;
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
    this.fichajesState.cargando = true;
    setTimeout(() => {
      this.fichajesService.cargarUltimosFichajes()
        .subscribe((ultimosFichajes: Array<any>) => {
          this.fichajesState.ultimosFichajes = ultimosFichajes;
          this.fichajesState.cargando = false;
        });
    }, 1500);
  }


  actualizarEstadoJornada(fichaje: Fichaje) {
    const estadoJornada: EstadoJornada = this.fichajesService.calcularEstadoJornada(fichaje);
    this.fichajesState.estadoJornada = estadoJornada;
    console.log(estadoJornada);
  }

  actualizarEstadosPantalla(fichaje: Fichaje) {
    this.fichajesState.fichajeAConsultar = fichaje;
    this.actualizarEstadoJornada(fichaje);
  }

}
