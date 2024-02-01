import { Component } from '@angular/core';
import { Ingredients } from '../Shared/Ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredient: Ingredients[] = [
    new Ingredients('Onion', 1),
    new Ingredients('Tomato', 3)
  ];
}
