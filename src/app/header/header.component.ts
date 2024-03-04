import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated= false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logOut();
  }
}
