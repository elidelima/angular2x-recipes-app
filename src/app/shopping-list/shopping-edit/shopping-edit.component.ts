import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.
      subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editIngredient = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editIngredient.name,
            amount: this.editIngredient.amount
          })
        }
      );
  }

  onAddIngredient(form: NgForm) {
    const value =  form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClearForm() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }
}
