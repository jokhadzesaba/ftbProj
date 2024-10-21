import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert',
  standalone: true,
})
export class DateConvertPipe implements PipeTransform {
  transform(value: Date): number {
    const msInOneHour = 60 * 60 * 1000;
    let diffInMs = Math.abs(value.getDate() - new Date().getDate());
    const hours = Math.floor(diffInMs / msInOneHour);
    return hours;
  }
}
