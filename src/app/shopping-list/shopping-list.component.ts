import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../Shared/Ingredients.model';
import { ShoppingListService } from './shipping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredient: Ingredients[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.ingredient = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChange
    .subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredient = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
