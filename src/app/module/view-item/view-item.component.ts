import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ItemService } from '../../injectables/item.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  items$: Observable<any>;
  constructor(private readonly itemService: ItemService, private readonly authService: AuthService) {
    this.items$ = this.authService.getUserState().pipe(switchMap((user) => this.itemService.getItems(user.uid)))
  }

  ngOnInit() {
  }

}
