import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'keys' ,pure:false})
export class KeysPipe implements PipeTransform {
  transform(value): any {
    if(!value) return null;
    var keys = [];
    Object.keys(value).map(((key:any) => {
      var addKey = 0;
      value[key].map(filter => {
        if (!filter.show) {
            addKey += 1;
        }
      })
      if (addKey < value[key].length) {
        keys.push(key)
      }
    }))
    return keys;
  }
}


@Pipe({ name: 'keysCase' ,pure:false})
export class KeysCasePipe implements PipeTransform {
  transform(value): any {
    if(!value) return null;
    return Object.keys(value);
  }
}
