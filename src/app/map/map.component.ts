import { ApplicationRef, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule,PanelComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 41.6938, lng: 44.8015 };
  zoom = 16;

  stadiums = [
    { stadiumIndex:0, name: 'Stadium 1', position: { lat: 41.725738, lng: 44.71887 } },
    { stadiumIndex:1, name: 'Stadium 2', position: { lat: 41.692, lng: 44.7995 } },
    { stadiumIndex:2, name: 'Stadium 3', position: { lat: 41.691, lng: 44.802 } },
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
          this.onStadiumClick(stadium);
        });
      });
    } else {
      console.error('Map element not found');
    }
  }

  onStadiumClick(stadium: any) {
    console.log('Stadium clicked:', stadium.name, stadium.position);
  }
}
