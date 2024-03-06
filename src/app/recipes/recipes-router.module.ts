import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from "@angular/router";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { DataStorageService } from "../Shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";


const RecipeResolver: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const recipes = inject(RecipeService).getRecipes();
    if (recipes.length === 0) {
      return inject(DataStorageService).fetchRecipes();
    } else {
      return recipes;
    }
  };
  
  const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (!isAuth) {
          return router.createUrlTree(['/auth']);
        }
        return true;
      })
    );
  };
  
const routes: Routes = [
    {
      path: 'recipes',
      canActivate: [AuthGuard],
      component: RecipesComponent,
      children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        {
          path: ':id',
          component: RecipeDetailComponent,
          resolve: [RecipeResolver],
        },
        {
          path: ':id/edit',
          component: RecipeEditComponent,
          resolve: [RecipeResolver],
        },
      ],
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRouterModule{}