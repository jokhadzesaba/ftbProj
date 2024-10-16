import { Pipe, PipeTransform } from '@angular/core';
import { Join } from '../interfaces/interfaces';

@Pipe({
  name: 'countCurrentQuantity',
  standalone: true
})
export class CountCurrentQuantityPipe implements PipeTransform {

  transform(value: Join[]): number {
    let counter  = 0;
    value.forEach(x => {
      counter+=x.people
    })
    return counter
  }

}
