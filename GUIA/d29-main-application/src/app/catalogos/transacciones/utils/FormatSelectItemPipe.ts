import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Pipe({
  name: 'formatSelectItem'
})
export class FormatSelectItemPipe implements PipeTransform {
  transform(value: any[], valueProperty: string, labelProperty: string): SelectItem[] {
    if (value) {
     return value.map(function (item) {
        return {
          value: item[valueProperty],
          label: item[labelProperty]
        };
      });
    }
  }
}