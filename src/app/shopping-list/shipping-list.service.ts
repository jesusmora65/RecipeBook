import { EventEmitter } from "@angular/core";
import { Ingredients } from "../Shared/Ingredients.model";

export class ShoppingListService{
    ingredientsChange = new EventEmitter<Ingredients[]>();
  private ingredient: Ingredients[] = [
    new Ingredients('Onion', 1),
    new Ingredients('Tomato', 3)
  ];

  getIngredients(){
    return this.ingredient.slice();
  }

  addIngredient(ingredient: Ingredients){
    this.ingredient.push(ingredient);
    this.ingredientsChange.emit(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredients[]){
    // for (var ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredient.push(...ingredients);
    this.ingredientsChange.emit(this.ingredient.slice());
  }
}