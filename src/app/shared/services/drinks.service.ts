import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cocktail } from 'src/app/models/cocktails.model';

interface ApiResponse {
  drinks: Cocktail[];
}

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private readonly apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  /**
   * Esta función se utiliza para obtener todos los ingredientes de la API.
   * @returns Un Observable con un array de los ingredientes en forma de strings.
   */
  getAllIngredients(): Observable<string[]> {
    return this.getFromApi<{ drinks: { strIngredient1: string }[] }>('list.php', { i: 'list' })
      .pipe(
        map(response => response.drinks.map(drink => drink.strIngredient1)),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener todos los tipos de bebida de la API.
   * @returns Un Observable con un array de los tipos de bebida en forma de strings.
   */
  getAllDrinkTypes(): Observable<string[]> {
    return this.getFromApi<{ drinks: { strCategory: string }[] }>('list.php', { c: 'list' })
      .pipe(
        map(response => response.drinks.map(drink => drink.strCategory)),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener todas las bebidas que contienen un cierto ingrediente.
   * @param ingredients Un array de los ingredientes.
   * @returns Un Observable con un array de los cocteles que contienen el ingrediente.
   */
  getDrinksByIngredient(ingredients: string[]): Observable<Cocktail[]> {
    return this.getFromApi<ApiResponse>('filter.php', { i: ingredients[0] })
      .pipe(
        map(response => response.drinks),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener un coctel específico por su ID.
   * @param id La ID del coctel.
   * @returns Un Observable con el coctel correspondiente a la ID proporcionada.
   */
  getDrinkById(id: string): Observable<Cocktail> {
    return this.getFromApi<ApiResponse>('lookup.php', { i: id })
      .pipe(
        map(response => response.drinks[0]),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener un coctel que contiene un cierto ingrediente.
   * @param ingredients Un array de los ingredientes.
   * @returns Un Observable con el primer coctel que contiene el ingrediente.
   */
  getOneDrinkByIngredient(ingredients: string[]): Observable<Cocktail> {
    return this.getFromApi<ApiResponse>('filter.php', { i: ingredients[0] })
      .pipe(
        map(response => response.drinks[0]),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener cocteles por su nombre.
   * @param name El nombre del coctel.
   * @returns Un Observable con un array de los cocteles que corresponden al nombre proporcionado.
   */
  getDrinksByName(name: string): Observable<Cocktail[]> {
    return this.getFromApi<ApiResponse>('search.php', { s: name })
      .pipe(
        map(response => response.drinks),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función se utiliza para obtener cocteles por su tipo de alcohol.
   * @param alcoholic El tipo de alcohol del coctel.
   * @returns Un Observable con un array de los cocteles que corresponden al tipo de alcohol proporcionado.
   */

  getDrinksByAlcoholic(alcoholic: string): Observable<Cocktail[]> {
    return this.getFromApi<ApiResponse>('filter.php', { a: alcoholic })
      .pipe(
        map(response => response.drinks),
        catchError(this.handleError)
      );
  }

  /**
   * Esta función privada se utiliza para hacer una llamada HTTP GET a la API.
   * @param endpoint El endpoint de la API a la que se quiere acceder.
   * @param params Los parámetros de la consulta HTTP.
   * @returns Un Observable con la respuesta de la API.
   */
  private getFromApi<T>(endpoint: string, params?: { [key: string]: string }): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  /**
   * Esta función privada se utiliza para manejar los errores de las llamadas HTTP.
   * @param error El error recibido.
   * @returns Un Observable que emite un error.
   */
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}
