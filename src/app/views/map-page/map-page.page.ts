import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';


import * as L from 'leaflet';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/Services/photo.service';
import { log } from 'console';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  
})
export class MapPagePage implements OnInit, AfterViewInit {

   api ='pk.eyJ1IjoiZXBhbGV5dmFuIiwiYSI6ImNsZDBvbmZydDAwZHMzcnF4M3E4MmZzZzgifQ.Wr4NvYRxU0lhSWe4JkC4fw';
      
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
 constructor(private route :Router, private photoService:PhotoService, private modalController: ModalController) { }

 location:any;
 

  private initMap(): void {
    this.map = L.map('map', {
      center: [3.866667, 11.516667 ],
      zoom: 12
    });
    
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      minZoom:10 ,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this.api,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(this.map);
var marker: L.Marker<any> ;
     const yaounde ={
  lat:3.866667,
  lng:11.516667
 }

 if (this.photoService.getWhere() == 1){
  this.map.on('click', (e: any) => {
    if (marker) {
        this.map.removeLayer(marker);
    }
    
    marker = L.marker(e.latlng,{icon:this.smallIcon}).addTo(this.map);
    console.log(e.latlng);
    this.photoService.setLocalisation(e.latlng);

    const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=f87e5ff45b4f429a830b9af29e3867f9`;
     // call Reverse Geocoding API - https://www.geoapify.com/reverse-geocoding-api/
  fetch(reverseGeocodingUrl).then(result => result.json())
  .then(featureCollection => {
    const infosLocalisation ={
      'quarter': featureCollection.features[0].properties.suburb,
      'info': featureCollection.features[0].properties.formatted
    } 

    console.log('yo');
    
    console.log(featureCollection);
    console.log('Linfos',infosLocalisation);
    this.photoService.setinfoLocalisation(infosLocalisation)
    
    
  });
    
  });
 }
 
  
  }

  addMarker(coords:any){
    const marker = L.marker([coords.lat, coords.lng], {icon:this.smallIcon});
    marker.addTo(this.map);
  }


  

  ngAfterViewInit(){

    setTimeout(
      this.initMap.bind(this),
      500
    )
    
    console.log('ffff');
  }

  ngOnInit() {
    
  }



  reloadPage(){
    
   
  }

  
  Finish(){
    console.log('where', this.photoService.getWhere());
    this.modalController.dismiss(null, 'backdrop');
    // if (this.photoService.getWhere() == 1){
    //   this.route.navigate(['/add-place'])
    // };

    // this.route.navigate(['/tabs/home']);
  }



  
}
