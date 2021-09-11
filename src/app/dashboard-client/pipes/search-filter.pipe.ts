import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false,
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[]): any {
    if (!items) {
        return items;
    }
    return items.filter(item => item.show);
}

}
