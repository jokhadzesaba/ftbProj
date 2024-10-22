import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Join, Reservetion, Stadium } from '../interfaces/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private url =
    'https://anotherone-16eb7-default-rtdb.europe-west1.firebasedatabase.app/stadiums';
  constructor(private http: HttpClient) {}
  getStadiumData(stadiumIndex: number) {
    return this.http.get<Stadium>(`${this.url}/${stadiumIndex}.json`);
  }
  addJoin(
    stadiumIndex: number,
    numberOfPeople: number,
    ball: boolean,
    message: string,
    phoneNumber: string,
    ageGroup: string,
    passoword: string
  ) {
    return this.http.get<Stadium>(`${this.url}/${stadiumIndex}.json`).pipe(
      tap((res) => {
        let array = res.joined;
        const join: Join = {
          people: numberOfPeople,
          phoneNumber: phoneNumber,
          ball: ball,
          avarageAge: ageGroup,
          message: message,
          joinDate: new Date(),
          password: passoword,
        };
        const updatedArray = [...array, join];
        res.joined = updatedArray;
        this.http.patch(`${this.url}/${stadiumIndex}.json`, res).subscribe();
      })
    );
  }
  deletePlan(stadiumIndex: number, password: string) {
   return this.http.get<Stadium>(`${this.url}/${stadiumIndex}.json`).pipe(
      tap((res) => {
        let array = res.reservetions;
        const updatedArray = array.filter((x) => x.password !== password);
        res.reservetions = updatedArray;
        this.http.patch(`${this.url}/${stadiumIndex}.json`, res).subscribe();
      })
    );
  }
  deleteJoin(stadiumIndex: number, password: string) {
   return this.http.get<Stadium>(`${this.url}/${stadiumIndex}.json`).pipe(
      tap((res) => {
        let array = res.joined;
        const updatedArray = array.filter((x) => x.password !== password);
        res.joined = updatedArray;
        this.http.patch(`${this.url}/${stadiumIndex}.json`, res).subscribe();
      })
    );
  }
  addPlan(
    stadiumIndex: number,
    numberOfPeople: number,
    ball: boolean,
    message: string,
    phoneNumber: string,
    ageGroup: string,
    eventDate: string,
    eventTime: string,
    passoword: string
  ) {
    return this.http.get<Stadium>(`${this.url}/${stadiumIndex}.json`).pipe(
      tap((res) => {
        let array = res.reservetions;
        const join: Reservetion = {
          people: numberOfPeople,
          phoneNumber: phoneNumber,
          ball: ball,
          avarageAge: ageGroup,
          message: message,
          date: eventDate,
          hour: eventTime,
          password: passoword,
        };
        const updatedArray = [...array, join];
        res.reservetions = updatedArray;
        this.http.patch(`${this.url}/${stadiumIndex}.json`, res).subscribe();
      })
    );
  }
}
