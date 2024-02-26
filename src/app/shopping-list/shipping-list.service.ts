import { Ingredients } from "../Shared/Ingredients.model";
import { Subject } from "rxjs";

export class ShoppingListService{
  ingredientsChange = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();
  private ingredient: Ingredients[] = [
    new Ingredients('Onion', 1),
    new Ingredients('Tomato', 3)
  ];

  getIngredients(){
    return this.ingredient.slice();
  }

  getIngredient(index: number){
    return this.ingredient[index];
  }

  addIngredient(ingredient: Ingredients){
    this.ingredient.push(ingredient);
    this.ingredientsChange.next(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredients[]){
    // for (var ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredient.push(...ingredients);
    this.ingredientsChange.next(this.ingredient.slice());
  }

  updateIngredient(index: number, ingredient: Ingredients){
    this.ingredient[index] = ingredient;
    this.ingredientsChange.next(this.ingredient.slice());
  }

  onDelete(index: number){
    this.ingredient.splice(index, 1);
    this.ingredientsChange.next(this.ingredient.slice());
  }
} 