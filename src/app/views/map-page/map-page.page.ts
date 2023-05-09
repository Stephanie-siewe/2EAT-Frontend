import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import * as L from 'leaflet';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  
})
export class MapPagePage implements OnInit, AfterViewInit {
 private map:any;
 smallIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [13, 0],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
 });

//  const yaounde ={
//   lat:3.866667,
//   lng:11.516667
//  }
 constructor() { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [3.866667, 11.516667 ],
      zoom: 10
    });
    
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom:10 ,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(this.map);
var marker: L.Marker<any> ;
     const yaounde ={
  lat:3.866667,
  lng:11.516667
 }
 this.map.on('click', (e: any) => {
  if (marker) {
      this.map.removeLayer(marker);
  }
  marker = L.marker(e.latlng,{icon:this.smallIcon}).addTo(this.map);
  console.log(e.latlng);
});
  
  }

  addMarker(coords:any){
    const marker = L.marker([coords.lat, coords.lng], {icon:this.smallIcon});
    marker.addTo(this.map);
  }


  

  ngAfterViewInit(){
    this.initMap();
  }

  ngOnInit() {
    
  }



  reloadPage(){
    
   
  }



  
}
