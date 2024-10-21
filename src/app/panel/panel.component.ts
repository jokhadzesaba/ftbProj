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
import { Join, Stadium } from '../interfaces/interfaces';
import { map, Observable } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { JoinedComponent } from '../joined/joined.component';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';
import { CountCurrentQuantityPipe } from '../pipes/count-current-quantity.pipe';
import { FormsComponent } from '../forms/forms.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
  ],
})
export class PanelComponent implements OnChanges, OnInit {
  @Input() stadiumIndex?: number;
  public stadiumData?: Observable<Stadium>;
  toggle: boolean = true;
  public joined: Join[] = [];
  constructor(
    private service: RestService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.setDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['stadiumIndex'] &&
      this.stadiumIndex !== undefined &&
      this.stadiumIndex > -1
    ) {
      this.stadiumData = this.service.getStadiumData(this.stadiumIndex).pipe(
        map((stadium) => {
          if (stadium && stadium.joined) {
            const twoHoursInMs = 2 * 60 * 60 * 1000;
            const currentTime = new Date().getTime();
            stadium.joined = stadium.joined.filter((join: Join) => {
              const joinDate = new Date(join.joinDate).getTime();
              return currentTime - joinDate <= twoHoursInMs;
            });
          }

          return stadium;
        })
      );
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
  setDefault() {
    this.translateService.setDefaultLang('en');
  }
  changeLng(lng: 'en' | 'geo') {
    this.translateService.use(lng);

  }
}
