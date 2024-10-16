import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Stadium } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JoinedComponent } from '../joined/joined.component';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';
import { CountCurrentQuantityPipe } from '../pipes/count-current-quantity.pipe';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  standalone: true,
  imports:[CommonModule,JoinedComponent,ConvertBooleanPipe,CountCurrentQuantityPipe]
})
export class PanelComponent implements OnChanges, OnInit {
  @Input() stadiumIndex?: number;
  public stadiumData?: Observable<Stadium>;
  constructor(private service: RestService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stadiumIndex'] && this.stadiumIndex) {
      this.stadiumData = this.service.getStadiumData(this.stadiumIndex);
    }
  }
}
