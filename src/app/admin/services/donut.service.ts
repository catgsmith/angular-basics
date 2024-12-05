import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonutService {
  //baseUrl = "http://localhost:3000";


  private donuts: Donut[] = [  ];

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  read() {
    return this.http.get<Donut[]>(`/api/donuts`);
    //return this.http.get<Donut[]>(this.baseUrl + '/donuts');
    //return this.donuts;
  }

 /*  readOne(id: string) {
    const donut = this.read().find((donut: Donut) => donut.id === id);

    if (donut) {
      return donut;
    }

    return { name: '', icon: '', price: 0, description: '' };
  } */

  create(payload: Donut): void {
    this.donuts = [ ...this.donuts, payload ];
    console.log(this.donuts); // For debugging
  }

  update(payload: Donut): void {
    this.donuts = this.donuts.map((donut: Donut) => {
      return donut.id === payload.id ? { ...donut, ...payload } : donut;
    });
    console.log(this.donuts); // For debugging
  }

  delete(payload: Donut): void {
    this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
    console.log(this.donuts); // For debugging
  }
}