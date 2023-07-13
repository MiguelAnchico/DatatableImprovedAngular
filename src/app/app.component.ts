import { Component, inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cocktail } from './models/cocktails.model';
import { Subject } from 'rxjs';

import {map, takeUntil } from 'rxjs/operators';
import { DrinksService } from './shared/services/drinks.service';

type IngredientKeys = 'strIngredient1' | 'strIngredient2' | 'strIngredient3' | 'strIngredient4' | 'strIngredient5' | 'strIngredient6' | 'strIngredient7' | 'strIngredient8' | 'strIngredient9' | 'strIngredient10' | 'strIngredient11' | 'strIngredient12' | 'strIngredient13' | 'strIngredient14' | 'strIngredient15';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cocktails: Cocktail[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private onDestroy = new Subject<void>();

  constructor(private drinksService: DrinksService) {}

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
      },
      pagingType: 'full_numbers'
    };

    this.drinksService.getDrinksByName('a')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data: Cocktail[]) => {
        this.cocktails = data;
        this.dtTrigger.next(data);
      }, (error: any) => {
        console.log(error);
      });
  }

  concatIngredients(cocktail: Cocktail) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}` as IngredientKeys;
      const ingredient = cocktail[ingredientKey];
      if (ingredient) {
        ingredients += ingredient + ', ';
      }
    }
    // Remove the trailing comma and space
    ingredients = ingredients.slice(0, -2);
    return ingredients;
}

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
