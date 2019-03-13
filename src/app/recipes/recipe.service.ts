import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService : ShoppingListService) {}

    private recipes: Recipe[] = [
        new Recipe(
            'Coffee Recipes',
            'This is a first recipe',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1), 
                new Ingredient('French Fries', 1),
            ]),
        new Recipe(
            'Another Coffee Recipes',
            'This is a second recipe',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 2), 
                new Ingredient('Meat', 1),
            ]),
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index:number) {
        return this.recipes[index];
    }

    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}