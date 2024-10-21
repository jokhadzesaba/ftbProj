import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { PanelComponent } from '../panel/panel.component';

import { RestService } from '../services/rest.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, PanelComponent,TranslateModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 41.723271, lng: 44.718339 };
  zoom = 16;
  stadiumIndex: number = -1;
  rules = true;
  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  stadiums = [
    {
      stadiumIndex: 0,
      name: 'Stadium 1',
      position: { lat: 41.725738, lng: 44.71887 },
    },
    {
      stadiumIndex: 1,
      name: 'Stadium 2',
      position: { lat: 41.724259, lng: 44.718535 },
    },
    {
      stadiumIndex: 2,
      name: 'Stadium 3',
      position: { lat: 41.724565, lng: 44.721159 },
    },
  ];

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  map!: google.maps.Map;

  ngAfterViewInit() {
    this.loadGoogleMapsAPI().then(() => {
      this.initMap();
    });
  }
  loadGoogleMapsAPI(): Promise<void> {
    return new Promise(() => {
      const checkIfGoogleIsDefined = () => {
        if (typeof google !== 'undefined') {
          this.initMap();
        }
      };
      checkIfGoogleIsDefined();
    });
  }

  initMap() {
    if (this.mapElement) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: this.center,
        zoom: this.zoom,
        mapId: '9c639328242b2e93',
      });

      this.stadiums.forEach((stadium) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: stadium.position,
          map: this.map,
          title: stadium.name,
        });

        marker.addListener('click', () => {
          this.onStadiumClick(stadium.stadiumIndex);
        });
      });
    } else {
      console.error('Map element not found');
    }
  }
  onStadiumClick(stadiumIndex: number) {
    this.stadiumIndex = stadiumIndex;
  }

  changeLng(lng:'en'|'geo'){
    this.translateService.use(lng)
  }
  moveForward(){
    this.rules = false
  }
}
