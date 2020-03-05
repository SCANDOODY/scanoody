import { Pipe, PipeTransform } from '@angular/core';
import { ItemService } from '../injectables/item.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'qantity'
})
export class QantityPipe implements PipeTransform {

  constructor(private readonly itemService: ItemService) { }
  transform(unitId: string) {
    return this.itemService.getUnits().pipe(map((item) => item.find(un => un.id === unitId)));
  }

}
