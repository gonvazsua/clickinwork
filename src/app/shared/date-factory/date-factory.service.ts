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

}
