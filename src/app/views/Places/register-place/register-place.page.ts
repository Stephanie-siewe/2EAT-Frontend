
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PhotoService } from 'src/app/Services/photo.service';
import { Router } from '@angular/router';
import { OptionscameraPage } from '../../optionscamera/optionscamera.page';
// import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.page.html',
  styleUrls: ['./register-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPlacePage implements OnInit {
  constructor(public actionSheetController: ActionSheetController, 
    private route: Router,
    private modalcontroller:ModalController,
    private photoService:PhotoService ) {}

  ngOnInit() {}

  gotoPlaceList(){
    this.route.navigate(['/places-list'])
  }

  addLastName() {
    this.presentActionSheet();
  }
  onSubmit() {}
 

  takePhoto() {}
  choosePhoto() {}

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
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    // this.photo = image.webPath;
  
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      cssClass: 'my-custom-class',
      mode:'ios',
      animated: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: async () => {
            const photo = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Camera,
            });
            const photoUri = photo.webPath;
            // Faites quelque chose avec photoUri
          },
        },
        {
          text: 'Select a picture',
          icon: 'image',
          handler: async () => {
            const photo = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Photos,
            });
            const photoUri = photo.webPath;
            // Faites quelque chose avec photoUri
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  /*****************AddPhotoToGallery******************** */
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}

