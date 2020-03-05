import { PipeTransform, Pipe } from '@angular/core';
import { RecipeService } from '../injectables/recipe.service';
@Pipe({
    name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
    constructor(private readonly recipeService: RecipeService) { }
    transform(path: string) {
        return this.recipeService.getImageUrl(path);
    }
}