import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private ingredientsChangeSubs : Subscription;

  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangeSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (newIngredients: Ingredient[]) => this.ingredients = newIngredients);
  }

  ngOnDestroy() {
    this.ingredientsChangeSubs.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  
}

