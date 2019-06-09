
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFactoryService {

  constructor() { }

  getDiffInHours(dateFrom: Date, dateTo: Date): Date {
    const diff = +dateFrom - +dateTo;
    const dateDiff = new Date(diff);
    dateDiff.setHours(dateDiff.getHours() - 1);
    return dateDiff;
  }

  calcularDiferenciaEnMinutos(desde: Date, hasta: Date): number {
    const hours = desde.getHours() - hasta.getHours();
    const minutes = Math.abs(desde.getMinutes() - hasta.getMinutes());
    return (hours * 60) + minutes;
  }

  minutosADate(minutos: number): Date {
    const date = new Date(0,0,0,0,0,0,0);
    const horas = Math.round(minutos / 60);
    const minsTarget = minutos - (horas * 60);
    date.setHours(horas);
    date.setMinutes(minsTarget);
    return date;
  }

  toUTCDate(date: Date) {
    const utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return new Date(utc);
  }

}
