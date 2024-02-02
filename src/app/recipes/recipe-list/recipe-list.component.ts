import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Receta de ejemplo", "Esta es una receta de ejemplo", "https://www.comedera.com/wp-content/uploads/2022/10/Gallo-pinto-de-Costa-Rica-shutterstock_1148861354.jpg"),
    new Recipe("Receta de ejemplo", "Esta es una receta de ejemplo", "https://www.comedera.com/wp-content/uploads/2022/10/Gallo-pinto-de-Costa-Rica-shutterstock_1148861354.jpg")
  ];

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
