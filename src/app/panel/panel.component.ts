import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Stadium } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { JoinedComponent } from '../joined/joined.component';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';
import { CountCurrentQuantityPipe } from '../pipes/count-current-quantity.pipe';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    JoinedComponent,
    ConvertBooleanPipe,
    CountCurrentQuantityPipe,
    FormsComponent,
  ],
})
export class PanelComponent implements OnChanges, OnInit {
  @Input() stadiumIndex?: number;
  public stadiumData?: Observable<Stadium>;
  toggle: boolean = false;
  constructor(private service: RestService, private scroll: ViewportScroller) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stadiumIndex'] && this.stadiumIndex) {
      this.stadiumData = this.service.getStadiumData(this.stadiumIndex);
    }
  }
  scrollToform(togle: boolean) {
    this.toggle = togle;
    document.getElementById('form')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
