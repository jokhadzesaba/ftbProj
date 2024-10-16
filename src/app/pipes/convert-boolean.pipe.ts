import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBoolean',
  standalone:true
})
export class ConvertBooleanPipe implements PipeTransform {

  transform(value: boolean) {
    return value ? 'Yes': 'No'
  }

}
