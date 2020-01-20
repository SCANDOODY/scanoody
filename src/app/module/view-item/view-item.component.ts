import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ItemService } from '../../injectables/item.service';
import { AuthService } from '../../auth/auth.service';
import { firestore } from 'firebase';
import { NbDialogService } from '@nebular/theme';
import { UpdateItemComponent } from '../update-item/update-item.component';


@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  items$: Observable<any>;
  constructor(private readonly itemService: ItemService,
    private readonly authService: AuthService,
    private readonly nbService: NbDialogService) {
    this.items$ = this.authService.getUserState().pipe(switchMap((user) => this.itemService.getItems(user.uid)))
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
}
