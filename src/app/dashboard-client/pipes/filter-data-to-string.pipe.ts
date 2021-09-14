import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDataToString'
})
export class FilterDataToStringPipe implements PipeTransform {

  transform(input: any[], ...args: unknown[]): unknown {
    if (!input){
      return null
    };

    return input.map(filter => {return filter.name} ).join(' ');
  }

}
