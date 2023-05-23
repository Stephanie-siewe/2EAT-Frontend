import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { PhotoService } from 'src/app/Services/photo.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';

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
  placeInfos:any;
  messageErrorApi = '';
  constructor( private modalController: ModalController, private auth:AuthService, private photo:PhotoService, private http:HttpServiceService) { 
    this.userid  = localStorage.getItem('user_id');
    this.placeInfos =JSON.parse(localStorage.getItem('place_selected')!);
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
    
    if (this.photo.getWhere()==2){
      const place = {
        object_id:this.placeInfos.id,
        picture: this.imageData
      }
      console.log('photo updated?', place);
      
      this.http.modifyPicturePlace(place).subscribe((res)=>{
        console.log('response upated picture', res);
        this.placeInfos.picture = this.imageData;
        localStorage.setItem('place_selected', JSON.stringify(this.placeInfos))
      }, err =>{
        console.log('err', err.error);
        
      })
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

      if (this.photo.getWhere()==2){
        const place = {
          object_id:this.placeInfos.id,
          picture: this.imageData
        }
        console.log('photo updated?', place);
        
        this.http.modifyPicturePlace(place).subscribe((res)=>{
          console.log('response upated picture', res);
          
        }, err =>{
          console.log('err', err.error);
          
        })
      }
    }



    


 
}
