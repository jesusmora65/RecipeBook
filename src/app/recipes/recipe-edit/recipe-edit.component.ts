import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edot',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number;
  edidMode = false;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = parseInt(params['id']);
        this.edidMode = params['id'] != null;
      }
    );
  }
}
