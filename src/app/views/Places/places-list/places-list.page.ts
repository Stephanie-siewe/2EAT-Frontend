import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/Services/photo.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlacesListPage implements OnInit {
user_id:any;
places:any;
  constructor(private route: Router, private httpservice:HttpServiceService) { this.user_id = localStorage.getItem('user_id') }

  ngOnInit() {
  }

  ionViewDidEnter(){ 
    setTimeout(
      this.listPlaces.bind(this),
      500
    )
    
  }
  gotoPlaceEdit(){
    this.route.navigate(['/place-edit']);
  }

  gotoDetailPlace(){
    this.route.navigate(['/grilling-details'])
  }
  
  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];



  listPlaces(){
    this.httpservice.listPlaces().subscribe((res:any)=>{
      console.log('places',res);
      
      this.places = res
    }, err=>{
      console.log('error', err.error.error);
      
    })
  }

}
