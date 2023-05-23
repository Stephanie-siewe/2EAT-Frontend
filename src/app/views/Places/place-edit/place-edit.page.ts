
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OptionscameraPage } from '../../optionscamera/optionscamera.page';
import { CategorieService } from 'src/app/Services/categorie.service';
import { PhotoService } from 'src/app/Services/photo.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.page.html',
  styleUrls: ['./place-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlaceEditPage implements OnInit {
placeInfos:any;
categorie:any;
er =false;
messageErrorApi = '';
  constructor(private route :Router,
    public modalcontroller:ModalController, private cat: CategorieService,  private photoService:PhotoService, private http: HttpServiceService) { 
      this.start()
      this.er = false;
    }

  ngOnInit() {
    this.getCatList()
  }

  ionViewDidEnter(){
    this.start()
    
  }
  gotoSettings(){
    this.route.navigate(['/tabs/profile']);
  }

  start(){
    this.placeInfos = JSON.parse(localStorage.getItem('place_selected')!);
    console.log('infos place', this.placeInfos);
  }


  // photo = "https://i.pravatar.cc/150"

  getCatList(){
    this.cat.allList().subscribe(
      (cats:any) =>{
        this.categorie=cats;
        console.log(cats);
      }
    );
  }
  // compareWithFn = (o2:any) => {
  //   return this.placeInfos && o2 ? this.placeInfos.categorie.id === o2.id : this.placeInfos.categorie === o2;
  // };

  compareWithFn(optionValue: any, category: any): boolean {
    return optionValue.id === category.id;
  }







  
    async openOptionSelection() {
      this.photoService.SetWhere(2);
      const modal = await this.modalcontroller.create({
        component: OptionscameraPage,
        cssClass: 'transparent-modal'
      });
      modal.onDidDismiss()
      .then(res => {
        console.log(res);
        if (res.role !== 'backdrop') {
         ;
        }
      });
      return await modal.present();
    }



    updatedInfo(){
      const place = {
        name: this.placeInfos.name,
        user_id: this.placeInfos.id,
        order:this.placeInfos.order,
        description:this.placeInfos.description,
        city: this.placeInfos.localisation.city,
        quarter:this.placeInfos.localisation.quarter,
        longitude: this.placeInfos.localisation.longitude,
        latitude: this.placeInfos.localisation.latitude,
        category_id:this.placeInfos.category.id
      }
      console.log('place infos to update',place);
      
      this.http.modifyPlaceInformations(place).subscribe((res)=>{
        console.log('res',res);
        
      }, err=>{
        this.er = true;
        this.messageErrorApi =  err.error.error;
      })
    }
    
}
