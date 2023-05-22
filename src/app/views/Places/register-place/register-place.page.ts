
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder,FormControlName, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PhotoService } from 'src/app/Services/photo.service';
import { Router } from '@angular/router';
import { OptionscameraPage } from '../../optionscamera/optionscamera.page';

import { AuthService } from 'src/app/Services/auth.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { MapPagePage } from '../../map-page/map-page.page';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { log } from 'console';
// import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.page.html',
  styleUrls: ['./register-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class RegisterPlacePage implements OnInit {
  open = false;
  registerForm! : FormGroup ;
  er = false;
  quarter: any;
  messageErrorApi = '';  
  place: any = {

  } ;
  user_id :any;
  image: any = '';
  mapRef: any;

  categorie: any;
  constructor(public actionSheetController: ActionSheetController,private auth:AuthService, 
    private route: Router,
    private modalcontroller:ModalController,
    private photoService:PhotoService, private formBuilder: FormBuilder,private cat: CategorieService, private httpservice:HttpServiceService ) {this.user_id = localStorage.getItem('user_id');
  this.er = false;
  }


    ionViewWillEnter(){
      this.getCatList();
      
    }
  
  ionViewDidEnter(){
    this.open = false;
    
    // this.auth.getUserInfos(this.user_id).subscribe((res:any)=>{
    //   this.user = res;
    //   console.log('response1',res);
      
    // })

  }

  getCatList(){
    this.cat.allList().subscribe(
      (cats:any) =>{
        this.categorie=cats;
        console.log(cats);
      }
    );
  }
  ngOnInit() {
    this.er = false;
      this.registerForm = this.formBuilder.group({
        name:['',Validators.required],
  
        city: ['',[Validators.required]],
  
        description:['',[Validators.required]],

        category:['',[Validators.required]],
  
        
  
      })
    }

  gotoPlaceList(){
    this.route.navigate(['/places-list'])
  }

  

  // addLastName() {
  //   this.presentActionSheet();
  // }
  onSubmit() {}
 

  // takePhoto() {}
  // choosePhoto() {}

  async openOptionSelection() {
    this.photoService.SetWhere(1);
    const modal = await this.modalcontroller.create({
      component: OptionscameraPage,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss()
    .then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        // this.takePicture(res.data);
      }
    });
    return await modal.present();
  }
  


  async showMap(){
    this.photoService.SetWhere(1);
    // this.route.navigate(['/map-page'])
    const modal = await this.modalcontroller.create({
      component: MapPagePage,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss()
    .then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        // this.takePicture(res.data);
      }
    });
    return await modal.present();
  }


  SavePlace(){
   const image = this.photoService.getimageplace();
  const localisation = this.photoService.getlocalisation();
  const infosLocalisation = this.photoService.getinfoLocalisation();
   
  let loc = infosLocalisation.quarter + ','+ infosLocalisation.info;
  console.log('localisation',loc);
  
  let info = loc.split(',');
  if (info[0]== undefined || /^\d/.test(info[0])){
       this.quarter = info[1];
  }
  else{
    this.quarter = info[0];
  }
  // console.log('category',this.registerForm?.get('category')!.value);
  




    const placeData = {
      
      name: this.registerForm?.get('name')?.value,
      description:this.registerForm?.get('description')?.value,
      city:this.registerForm?.get('city')?.value,
      picture:image,
      user_id:this.user_id,
      category_id:this.registerForm?.get('category')!.value,
      longitude: localisation.lng,
      latitude:localisation.lat,
      quarter: this.quarter


    };
    console.log('place',placeData);


     this.httpservice.savePlace(placeData).subscribe((res:any)=>{
      console.log('save place',res);
      this.route.navigate(['/places-list'])
     },err=>{
        this.messageErrorApi = err.error.error;
      console.log('error',this.messageErrorApi);
      this.er = true;
     })
   

  }


  

  
}

