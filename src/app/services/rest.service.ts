import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stadium } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private url = 'https://anotherone-16eb7-default-rtdb.europe-west1.firebasedatabase.app/stadiums'
  constructor(private http:HttpClient) { }
  getStadiumData(stadiumIndex:number){
    return this.http.get<Stadium>(`${this.url}/0.json`)
  }
  post(){
    const stad:Stadium = {
      ball: false, light: false,
      people: 0,
      reservetions: [{
        phoneNumber: '',
        people: 0,
        ball: false,
        description: '',
        date: new Date(),
        hour: 0
      }]
    }
    this.http.post<Stadium>('https://anotherone-16eb7-default-rtdb.europe-west1.firebasedatabase.app/stadiums.json',stad).subscribe()
  }
}
