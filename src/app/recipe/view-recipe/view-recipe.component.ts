import { Component, OnInit } from '@angular/core';
import { take, switchMap, skipWhile } from 'rxjs/operators';
import { RecipeService } from 'src/app/injectables/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipies: Observable<any>;
  constructor(private readonly recipeService: RecipeService,
    private readonly userService: AuthService) {
    this.recipies = this.userService.getUserState().pipe(skipWhile(s => !s),
      switchMap((user) => this.recipeService.getReceipByUserId(user.uid)));
  }

  ngOnInit() {

  }

}
