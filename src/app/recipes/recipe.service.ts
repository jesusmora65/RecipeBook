import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.module";
import { Ingredients } from "../Shared/Ingredients.model";
import { ShoppingListService } from "../shopping-list/shipping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
    
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

  public recipeSelected = new Subject<Recipe>();

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

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}