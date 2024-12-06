import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

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
      })
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
      })
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
      })
    );
  }

  delete(payload: Donut): Observable<Donut> {
    return this.http.delete<Donut>(this.baseUrl + `/donuts/${payload.id}`).pipe(
    //return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
        console.log(this.donuts); // For debugging
      })
    );
  }
}