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
  imports: [CommonModule, GoogleMapsModule, PanelComponent, TranslateModule],
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
    {
      stadiumIndex: 3,
      name: 'Stadium 4',
      position: { lat: 41.724489, lng: 44.726427 },
    },
    {
      stadiumIndex: 4,
      name: 'Stadium 5',
      position: { lat: 41.725762, lng: 44.732134 },
    },
    {
      stadiumIndex: 5,
      name: 'Stadium 6',
      position: { lat: 41.728229, lng: 44.745629 },
    },
    {
      stadiumIndex: 6,
      name: 'Stadium 7',
      position: { lat: 41.7171812, lng: 44.7394371 },
    },
    {
      stadiumIndex: 7,
      name: 'Stadium 8',
      position: { lat:41.725800, lng:44.771230 },
    },
    {
      stadiumIndex: 8,
      name: 'Stadium 9',
      position: { lat:41.725711, lng:44.773613 },
    },
    {
      stadiumIndex: 9,
      name: 'Stadium 10',
      position: { lat:41.725338, lng:44.771421 },
    },
    {
      stadiumIndex: 10,
      name: 'Stadium 11',
      position: { lat:42.308235, lng:42.603456},
    },
    {
      stadiumIndex: 11,
      name: 'Stadium 12',
      position: { lat:42.317654, lng:42.602486},
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
          console.log(stadium.stadiumIndex);
          
        });
      });
    } else {
      console.error('Map element not found');
    }
  }
  onStadiumClick(stadiumIndex: number) {
    this.stadiumIndex = stadiumIndex;
  }

  changeLng(lng: 'en' | 'geo') {
    this.translateService.use(lng);
  }
  moveForward() {
    this.rules = false;
  }
}
