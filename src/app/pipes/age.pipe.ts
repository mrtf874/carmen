import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any): number {
    let age: number;
    const today = new Date();
    if ( value !== undefined ) {
      const birthDate = new Date( value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString() );
      age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if ( month < 0 || ( month === 0 && today.getMonth() < birthDate.getDate() ) ) {
        age--;
      }
    } else {
      age = 0;
    }
    return age;
  }
}
