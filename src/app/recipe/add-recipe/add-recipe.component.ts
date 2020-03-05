import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/injectables/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  receipeForm: FormGroup;
  image: File;
  imageUrl: any;
  user: firebase.User;
  takeUntil$ = new Subject();
  constructor(private readonly fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly authService: AuthService,
    private readonly router:Router) {
    this.receipeForm = this.fb.group({
      recipe: [null, Validators.required],
      ingradients: this.fb.array([this.fb.group({
        name: [null, Validators.required]
      })])
    });

    this.authService.getUserState().pipe(takeUntil(this.takeUntil$)).subscribe(user => this.user = user);
  }

  ngOnInit() {
  }
  addItem() {
    const ingradient = this.receipeForm.get('ingradients') as FormArray;
    ingradient.push(this.fb.group({
      name: [null, Validators.required]
    }));
  }
  ngOnDestroy() {
    this.takeUntil$.next();
  }
  upload(event) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }
  addRecipe() {
    if (!this.receipeForm.valid || !this.receipeForm.get('ingradients').valid || !this.user) {
      return;
    }
    const recipeObj: Recipe = {
      recipe: this.receipeForm.get('recipe').value,
      ingradients: this.receipeForm.get('ingradients').value.map(x=>x.name),
      userId: this.user.uid
    }
    this.recipeService.addRecipe(recipeObj, this.image).then(()=>this.router.navigate(['/home/dashboard']));
  }
}
