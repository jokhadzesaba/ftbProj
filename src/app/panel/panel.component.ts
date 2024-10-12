import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Stadium } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  standalone:true
})
export class PanelComponent implements OnChanges,OnInit{
  
  @Input() stadiumIndex?:number
  public stadiumData?:Observable<Stadium>
  constructor(private service:RestService){}
  ngOnInit(): void {
    // this.service.post()
    this.service.getStadiumData(0).subscribe(res=>{
      console.log(res);
      
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stadiumIndex'] && this.stadiumIndex) {
     this.stadiumData = this.service.getStadiumData(this.stadiumIndex)
     
    }
  }

}
