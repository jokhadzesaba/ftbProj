import { Component, Input, OnInit } from '@angular/core';
import { Join, Reservetion } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';
import { DateConvertPipe } from '../pipes/date-convert.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RestService } from '../services/rest.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-joined',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConvertBooleanPipe,
    DateConvertPipe,
    TranslateModule,
  ],
  templateUrl: './joined.component.html',
  styleUrl: './joined.component.scss',
})
export class JoinedComponent implements OnInit {
  @Input() joined?: Join;
  @Input() stadiumIndex?: number;
  @Input() reservetions?: Reservetion;
  public hours = 0;
  public minutes = 0;
  public password = '';
  public deleteButton: boolean = false;
  public errorMessage = false;
  public card = true
  constructor(private restService: RestService) {}
  ngOnInit(): void {
    this.dateTransform();
  }
  showInput() {
    this.deleteButton = !this.deleteButton;
  }
  delPlan() {
    if (this.stadiumIndex && this.reservetions) {
      if (this.reservetions.password !== this.password) {
        this.errorMessage = true;
      } else {
        this.restService.deletePlan(
          this.stadiumIndex,
          this.reservetions?.password
        ).subscribe(()=>{
          this.card = false
        });
      }
    }
  }
  delJoin() {
    if (this.stadiumIndex && this.joined) {
      if (this.joined.password !== this.password) {
        this.errorMessage = true;
      } else {
        this.restService.deleteJoin(this.stadiumIndex, this.joined?.password).subscribe(()=>{
          this.card = false
        })
      }
    }
  }
  dateTransform() {
    if (this.joined) {
      const joinDate = new Date(this.joined!.joinDate);
      const now = new Date();
      const diffInMs = Math.abs(now.getTime() - joinDate.getTime());
      const msInOneHour = 60 * 60 * 1000;
      const hours = Math.floor(diffInMs / msInOneHour);
      const remainingMs = diffInMs % msInOneHour;
      const minutes = Math.floor(remainingMs / (60 * 1000));
      this.minutes = minutes;
      this.hours = hours;
    }
  }
}
