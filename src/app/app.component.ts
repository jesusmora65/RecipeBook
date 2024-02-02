import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  loadedFeature = "Recipe";
  
  onNavigate(featura: string){
    this.loadedFeature = featura;
  }
}
