import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../Shared/Ingredients.model';
import { ShoppingListService } from './shipping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredient: Ingredients[];

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.ingredient = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChange
    .subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredient = ingredients;
      }
    );
  }
}
