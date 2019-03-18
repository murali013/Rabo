import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    if (!args[1]) {
      return items;
    }
    return items.filter(item => item[args[0]] == args[1]);
  }

}
