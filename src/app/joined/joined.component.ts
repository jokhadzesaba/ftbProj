import { Component, Input, OnInit } from '@angular/core';
import { Join, Reservetion } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';
import { DateConvertPipe } from '../pipes/date-convert.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-joined',
  standalone: true,
  imports: [CommonModule, ConvertBooleanPipe, DateConvertPipe,TranslateModule],
  templateUrl: './joined.component.html',
  styleUrl: './joined.component.scss',
})
export class JoinedComponent implements OnInit {
  @Input() joined?: Join;
  @Input() reservetions?: Reservetion;
  public hours = 0;

  ngOnInit(): void {
    this.dateTransform();
  }

  dateTransform() {
    if (this.joined) {
      const joinDate = new Date(this.joined!.joinDate);
      const now = new Date();
      const diffInMs = Math.abs(now.getTime() - joinDate.getTime());
      const msInOneHour = 60 * 60 * 1000;
      const hours = Math.floor(diffInMs / msInOneHour);
      this.hours = hours;
      
    }
  }
}
