import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatepipe'
})
export class CustomDatepipePipe implements PipeTransform {

  transform(dateToTransform: string, format: string): any {

    const date = new Date(dateToTransform);
    console.log(dateToTransform);
    if(format === 'date') {
      const years = String(date.getUTCFullYear());
      const months = String(date.getUTCMonth()+1);
      const day = String(date.getUTCDate());
      return this.twoDigits(day) + '/' + this.twoDigits(months) + '/' + this.twoDigits(years);
    } else if(format === 'time') {
      const hours = String(date.getUTCHours());
      const minutes = String(date.getUTCMinutes());
      return this.twoDigits(hours) + ':' + this.twoDigits(minutes);
    } else {
      return "";
    }

  }

  private twoDigits(value: string): string {
    return value.length === 1
      ? '0' + value
      : value;
  }

}
