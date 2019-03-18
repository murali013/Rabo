import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderbyPipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    return null;
  }*/

  transform(obj: any, field: any): any {
    let orderType = 'ASC';

    if (field.charAt(0) == '-') {
      orderType = 'DESC'
      field = field.substring(1);
    }
    console.log(orderType);
    obj.sort(function(a, b) {
      if (orderType === 'ASC') {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          }
          return 0;
      } else {
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          }
          return 0;
      }
    });

      
        return obj;
    }

}
