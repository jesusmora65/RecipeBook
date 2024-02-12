import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.module";
import { Ingredients } from "../Shared/Ingredients.model";
import { ShoppingListService } from "../shopping-list/shipping-list.service";

@Injectable()
export class RecipeService{
    
  private recipes: Recipe[] = [
    new Recipe(
      "Gallo Pinto", 
      "Esta es una receta de ejemplo", 
      "https://www.comedera.com/wp-content/uploads/2022/10/Gallo-pinto-de-Costa-Rica-shutterstock_1148861354.jpg",
      [
        new Ingredients("Arroz", 1),
        new Ingredients("Frijoles", 1)
      ])
  ];

  public recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes.slice()[id];
  }

  addIngredientsToList(ingredients: Ingredients[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}