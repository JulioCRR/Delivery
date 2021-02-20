import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'upperx'})
export class UpperCasePipeFormatter implements PipeTransform{
  transform(val) {
    
    if (val) {
      return val.toUpperCase()
    } else {
      return ''
    }

  } 
}