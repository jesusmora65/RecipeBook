import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree,
} from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { DataStorageService } from './Shared/data-storage.service';
import { Recipe } from './recipes/recipe.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { map, take } from 'rxjs/operators';

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

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
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
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
