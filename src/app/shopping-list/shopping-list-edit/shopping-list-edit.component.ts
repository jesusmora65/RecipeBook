import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from '../../Shared/Ingredients.model';
import { ShoppingListService } from '../shipping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredients;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.onDelete(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
