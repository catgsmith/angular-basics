import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DonutService {

  baseUrl = "http://localhost:3000";
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) { }

  read() : Observable<Donut[]> {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http.get<Donut[]>(`/api/donuts`).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      catchError(this.handleError)
    );
  }

  readOne(id: string) : Observable<Donut> {
    return this.read().pipe(
      map((donuts: Donut[]) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);

        if (donut) {
          return donut;
        }
        return { name: '', icon: '', price: 0, description: '' };
      })
    );
  }

  create(payload: Donut): Observable<Donut> {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) : Observable<Donut> {
    return this.http.put<Donut>(this.baseUrl + `/donuts/${payload.id}`, payload).pipe(
    //return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          return item.id === donut.id ? donut : item;
        });
        console.log(this.donuts); // For debugging
      }),
      catchError(this.handleError)//catchError((error) =>  handleError(error))
    );
  }

  delete(payload: Donut): Observable<Donut> {
    return this.http.delete<Donut>(this.baseUrl + `/donuts/${payload.id}`).pipe(
    //return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
        console.log(this.donuts); // For debugging
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${err.error.message}`; 
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; 
    }
    console.warn(errorMessage);
    // Use the updated throwError signature with a factory function
    return throwError(() => new Error(errorMessage));
  }
}