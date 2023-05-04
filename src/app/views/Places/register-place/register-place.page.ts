
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.page.html',
  styleUrls: ['./register-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPlacePage implements OnInit {
  constructor(public actionSheetController: ActionSheetController) {}

  ngOnInit() {}
  addLastName() {
    this.presentActionSheet();
  }
  onSubmit() {}
  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //   header: 'Albums',
  //   cssClass: 'actionsheet-button',
  //   buttons: [{

  //     role: 'destructive',
  //     icon: 'camera',
  //     handler: () => { console.log('Delete clicked'); }
  //     }, {

  //     icon: 'image'
  //     ,
  //     handler: () => { console.log('Share clicked'); }
  //     }
  //     ] // C’EST DANS CE TABLEAU QUE L’ON DEFINIT LES ACTIONS
  //   });
  //   await actionSheet.present();
  //   const { role } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  //   }

  takePhoto() {}
  choosePhoto() {}
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

}

