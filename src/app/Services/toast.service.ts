import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastcontroller: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastcontroller.create({
      message,
      duration: 1500,
      position: 'top',
      cssClass:"toast",
      buttons:  [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  }
}
