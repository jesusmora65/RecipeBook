import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(
        'https://recipebook-1422b-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://recipebook-1422b-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              Ingredients: recipe.Ingredients ? recipe.Ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
