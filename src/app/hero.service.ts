import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


import { Hero } from './hero';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = "api/heroes";

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log("Herois buscados!")),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Heroi ${id} buscado`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

   /** GET hero by id. Return `undefined` when id not found */
   getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Heroi atualizado id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`Herói adicionado w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>("addHero"))
      );
  }

  deleteHero(hero: Hero | number): Observable<any> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Herói deletado id=${id}`)),
        catchError(this.handleError<any>("deleteHero"))
      );
  }

  searchHeroes(term : string) : Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(_ => this.log(`Busca realizada: ${term}`)),
        catchError(this.handleError<Hero[]>("searchHeroes", []))
      );
  }

  private handleError<T>(operation: string = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Operation: ${operation} failed: ${error.message}`)
      return of(result as T);
    }
  }

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
