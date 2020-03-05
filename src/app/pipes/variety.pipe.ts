import { Pipe, PipeTransform } from '@angular/core';
import { ItemService } from '../injectables/item.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'variety'
})
export class VarietyPipe implements PipeTransform {
  constructor(private readonly itemService: ItemService) { }
  transform(categoryId: string) {
    return this.itemService.getCategory().pipe(map((item) => item.find(vr => vr.id === categoryId)));
  }

}
