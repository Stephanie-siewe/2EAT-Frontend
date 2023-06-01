import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/Services/photo.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,TranslateModule]
})
export class PlacesListPage implements OnInit {
user_id:any;
places:any;
search:any;
  constructor(private route: Router, private httpservice:HttpServiceService) { this.user_id = localStorage.getItem('user_id') }

  ngOnInit() {
  }

  ionViewDidEnter(){ 
    setTimeout(
      this.listPlaces.bind(this),
      200
    )
    
  }
  gotoPlaceEdit(data:any){
    localStorage.setItem('place_selected', JSON.stringify(data))
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
      res.filter((p:any) => p.user.id == this.user_id)
      this.places = res.filter((p:any) => p.user.id == this.user_id);
      if((this.places = [])){
        this.search =0;
        console.log('s1',this.search);

      }else{
        this.search=1;
      }
    }, err=>{
      console.log('error', err.error.error);
      
    })
  }


  deletePlace(id:number){
    this.httpservice.deletePlace(id).subscribe((res:any)=>{
      console.log('response',res);
      this.listPlaces();
    }, err=>{
      console.log('error', err.error.error);
      
    })
  }

  addPlace(){
    this.route.navigate(['/add-place']);
  }

}
