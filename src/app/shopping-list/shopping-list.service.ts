import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {
    
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients = this.ingredients.concat(newIngredients);
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredient(id:number) {

    }

}