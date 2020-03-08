import { Component, OnInit } from '@angular/core';
import { ItemService } from '../injectables/item.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { firestore } from 'firebase';
import { RecipeService } from '../injectables/recipe.service';
import { NbDialogService } from '@nebular/theme';
import { RecipeComponent } from '../recipe/recipe/recipe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items$: Observable<any>;
  selection: string[] = [];
  user: firebase.User;
  constructor(private readonly itemService: ItemService,
    private readonly authService: AuthService,
    private readonly recipeService: RecipeService,
    private readonly nbService: NbDialogService) {
    this.items$ = this.authService.getUserState().pipe(tap(user => this.user = user),
      switchMap((user) => this.itemService.getItemForDashboard(user.uid)));
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
  openSuggestion() {
    // console.log(this.selection);
    if (!this.selection.length || !this.user) {
      return;
    }
    this.recipeService.getReceipByUserId(this.user.uid).pipe(take(1)).subscribe((recipies) => {
      const found = recipies.filter(res => this.selection.every(i => res.Ingradients.map(x => x.toLowerCase()).includes(i.toLowerCase())));
      if (found.length) {
        const ref = this.nbService.open(RecipeComponent, { hasBackdrop: true, closeOnEsc: false, dialogClass: 'recipies-view' });
        ref.componentRef.instance.recipies = found;
      }
    });
  }
  selectionChange(e) {
    if (e.target.checked) {
      this.selection = [...new Set([...this.selection, e.target.value])];
      return;
    }
    const index = this.selection.indexOf(e.target.value);
    this.selection.splice(index, 1);
  }
}
