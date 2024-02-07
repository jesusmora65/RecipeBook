import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredients } from '../../Shared/Ingredients.model';
import { ShoppingListService } from '../shipping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent {
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService){}

  onAddItem(){
    const newIngredient = new Ingredients(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
