import { Pipe, PipeTransform } from '@angular/core';
import { FAQ } from '../interfaces/faq';

@Pipe({
  name: 'searchFaqPipe'
})
export class SearchFaqPipe implements PipeTransform {

  transform(items: FAQ[], ...args: string[]): unknown {
    if (!items){
      return [];
    }
    return items.filter(item => (item.title + item.subTitle + item.innerTittle + item.innerContent).toLocaleLowerCase().includes(args[0].toLocaleLowerCase()));
  }

}
