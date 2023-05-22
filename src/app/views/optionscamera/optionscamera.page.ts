import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { PhotoService } from 'src/app/Services/photo.service';

@Component({
  selector: 'app-optionscamera',
  templateUrl: './optionscamera.page.html',
  styleUrls: ['./optionscamera.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OptionscameraPage implements OnInit {
  imageData:any;
  userid:any;
  messageErrorApi = '';
  constructor( private modalController: ModalController, private auth:AuthService, private photo:PhotoService) { 
    this.userid  = localStorage.getItem('user_id');
  }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }
  startCapture(type:any) {
    this.modalController.dismiss(type, 'select');
  }

  async takePicture() {
    
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      this.imageData = image.base64String;
      console.log('image',this.imageData);
  
      if (this.photo.getWhere()== 0){
        const userData = {
          profile_image:this.imageData,
          id: this.userid
        }
        ;(await this.auth.changeImage(userData)).subscribe((res:any)=>{
          console.log('response image',res);
          
          
        },(error:any)=>{
          console.log('error',error);
          
        })
      }
      
    


    if (this.photo.getWhere() == 1){
     
      this.photo.setimageplace(this.imageData);
    }
    
    
  }


  async selectPicture() {

    
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
      this.imageData = image.base64String;
      console.log('image',this.imageData);
  
      if (this.photo.getWhere()== 0){
        const userData = {
          profile_image:this.imageData,
          id: this.userid
        }
        ;(await this.auth.changeImage(userData)).subscribe((res:any)=>{
          console.log('response image',res);
          // this.photo.setimageplace(this.imageData)
          
        },(error:any)=>{
          console.log('error',error);
          
        })
      }
      
    


    if (this.photo.getWhere() == 1){
     
      this.photo.setimageplace(this.imageData);
    }
    }



    


 
}
