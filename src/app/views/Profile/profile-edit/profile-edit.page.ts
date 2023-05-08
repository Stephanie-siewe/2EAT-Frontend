import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OptionscameraPage } from '../../optionscamera/optionscamera.page';

import { CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClientModule } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';
import { PhotoService } from 'src/app/Services/photo.service';
import { AuthService } from 'src/app/Services/auth.service';
import { DbService } from 'src/app/Services/db.service';





@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ProfileEditPage implements OnInit {
  
  messageErrorApi = '';
  user: any = {};
  user_id :any;
  image: any = '';
  person: Profile = new Profile(); 
  isUpload = false;
  constructor(private route: Router, public photoService: PhotoService,
    public modalcontroller:ModalController, private auth:AuthService, private db:DbService) { 
     this.user_id = localStorage.getItem('user_id');
    }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.image= '';
   
    this.auth.getUserInfos(this.user_id).subscribe((res:any)=>{
      this.user = res;
      console.log('response1',res);
      
    })
  }

  updateUSerInfos(){
    const userData = {
      id:this.user_id,
      phone_number:this.user.phone_number,
      email:this.user.email,
      username:this.user.username
    }

    this.auth.changeInfos(userData).subscribe((res:any)=>{
      console.log('response',res);
      this.db.get('username').then((us)=>{
        if (us != this.user.username){
          this.db.set('username',this.user.username).then(res=>{console.log(res)}
          );
        }
      });
      
    },((error:any)=>{
      console.log('error',error['error']);
      let er = error['error'];
      this.messageErrorApi = er['error'];
      
    }))
  }
  
  backtoSettings(){
    this.route.navigate(['/tabs/profile'])
  }
/***************updateProfile**********************/
  updateProfile(person: Profile){
    
  }
  /*****************AddPhotoToGallery******************** */
  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(
      data => {
        this.image = data;
        console.log("data is "+ data);
      }
    );
  }

  
    async openOptionSelection() {
      const modal = await this.modalcontroller.create({
        component: OptionscameraPage,
        cssClass: 'transparent-modal'
      });
      modal.onDidDismiss()
      .then(res => {
        console.log(res);
        if (res.role !== 'backdrop') {
          this.takePicture(res.data);
        }
      });
      return await modal.present();
    }
    async takePicture(type:any) {
      // const image = await Camera.getPhoto({
      //   quality: 90,
      //   allowEditing: false,
      //   resultType: CameraResultType.Uri,
      //   source: CameraSource[type]
      // });
      // this.photo = image.webPath;
    
    }
}
