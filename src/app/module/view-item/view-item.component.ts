import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ItemService } from '../../injectables/item.service';
import { AuthService } from '../../auth/auth.service';
import { firestore } from 'firebase';
import { NbDialogService } from '@nebular/theme';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { SortOrder } from '../../enums/sort-order.enum';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import { FilterItem } from '../../models/filter-item.model';


@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  items$: Observable<any>;
  activeSort: string;
  sortModel = {
    category: 0,
    company: 0,
    expiry: 0,
    name: 0
  };
  itemArray = [];
  sort = SortOrder;
  private _filterModel = new FilterItem();
  constructor(
    private readonly itemService: ItemService,
    private readonly authService: AuthService,
    private readonly nbService: NbDialogService) {
    this.items$ = this.authService.getUserState().pipe(
      switchMap((user) => this.itemService.getItems(user.uid).pipe(tap((items) => this.itemArray = items))));
    this.sortModel.expiry = SortOrder.ASC;
    this.activeSort = 'expiry';
    this._filterModel.categoryFilterOptions = this.itemService.getCategory().pipe(map((x) => x.map(e => ({ text: e['Category'], value: e.id }))));
  }

  ngOnInit() {
  }
  hasExpired(timestamp: firestore.Timestamp) {
    if (!timestamp) {
      return false
    }
    const ts = timestamp.toDate();
    const today = new Date().setHours(0, 0, 0, 0);
    const thatDay = ts.setHours(0, 0, 0, 0);

    return today > thatDay
  }
  removeItem(id: string) {
    this.itemService.removeItem(id).then();
  }
  openEditDialog(item) {
    const ref = this.nbService.open(UpdateItemComponent, { hasBackdrop: true, closeOnEsc: false, dialogClass: 'update-view' });
    ref.componentRef.instance.item = item;

  }
  sortTable(order: SortOrder, coloum: string) {
    if (coloum === 'category') {
      this.sortModel.category = order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
      this.activeSort = coloum;
      const newMappedArray = [...this.itemService.varietyCollection].sort(compareValues('Category', order));
      const resultArray = [];
      newMappedArray.forEach(unit => {
        resultArray.push(...this.itemArray.filter(item => item.Category === unit.id));
      });
      this.items$ = of(resultArray);
    } else if (coloum === 'expiry') {
      this.sortModel.expiry = order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
      this.activeSort = coloum;
      this.items$ = of([...this.itemArray].sort(compareValues('Expiry', order)));
    } else if (coloum === 'company') {
      this.sortModel.company = order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
      this.activeSort = coloum;
      this.items$ = of([...this.itemArray].sort(compareValues('Company', order)));
    } else if (coloum === 'name') {
      this.sortModel.name = order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
      this.activeSort = coloum;
      this.items$ = of([...this.itemArray].sort(compareValues('Name', order)));
    }
  }
  openFilterDialog() {
    const ref = this.nbService.open(FilterItemComponent, { hasBackdrop: true, closeOnEsc: false, dialogClass: 'filter-view' });
    ref.componentRef.instance.filterModel = this._filterModel;
  }
}
function compareValues(key: string, order = SortOrder.ASC) {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === SortOrder.DESC) ? (comparison * -1) : comparison
    );
  };
}
