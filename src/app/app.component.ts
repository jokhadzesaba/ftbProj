import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ftbProj';
  center: google.maps.LatLngLiteral = { lat: 41.6938, lng: 44.8015 };
  zoom = 16;

  stadiums = [
    { name: 'Stadium 1', position: { lat: 41.725738, lng: 44.71887 } },
    { name: 'Stadium 2', position: { lat: 41.692, lng: 44.7995 } },
    { name: 'Stadium 3', position: { lat: 41.691, lng: 44.802 } },
  ];

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  map!: google.maps.Map;

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    if (this.mapElement) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: this.center,
        zoom: this.zoom,
        mapId: 'YOUR_MAP_ID', // Replace with your actual Map ID
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
