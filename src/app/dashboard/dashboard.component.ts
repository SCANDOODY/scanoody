import { Component, OnInit } from '@angular/core';
import { ItemService } from '../injectables/item.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items$: Observable<any>;
  constructor(private readonly itemService: ItemService, private readonly authService: AuthService) {
    this.items$ = this.authService.getUserState().pipe(switchMap((user) => this.itemService.getItemForDashboard(user.uid)), tap((item) => {
      this.getClassName(item[0].Expiry)
    }));
  }

  ngOnInit() {
  }
  getClassName(timestamp: firestore.Timestamp) {
    if (!timestamp) {
      return ''
    }
    var ts = timestamp.toDate();
    var date = new Date();
    var today = new Date().setHours(0, 0, 0, 0);
    var thatDay = ts.setHours(0, 0, 0, 0);
    var nextDay = new Date(date.setDate(date.getDate() + 1)).setHours(0, 0, 0, 0);

    if (today === thatDay) {
      return 0
    } else if (nextDay === thatDay) {
      return 1
    } else {
      2
    }
  }
}
