import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  image:any;
  constructor() { }

  setimage(data:any){
    this.image = data;
  }

  getimage(){
    return this.image
  }

}
//   public async addNewToGallery() {
//     // Take a photo
//     const capturedPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 100
//     });
//     if (capturedPhoto) {
//       return this.savePicture(capturedPhoto);
//     }
//    /* const savedImageFile = await this.savePicture(capturedPhoto);
//     this.photos.unshift(savedImageFile);

//     this.photos.unshift({
//       filepath: "soon...",
//       webviewPath: capturedPhoto.webPath
//     });*/
//   }
  
//   /**************Save picture *********** */
// private async savePicture(photo: any,id= 4) { 
//    const data = {"id":id, "photo_image":photo};
//  //  const image = this.auth.changeImage(data);
//   /*const base64Data = await this.readAsBase64(photo);
//   const fileName = new Date().getTime() + '.jpeg';
//   const savedFile = await Filesystem.writeFile({
//     path: fileName,
//     data: base64Data,
//     directory: Directory.Data
//   });
//   return {
//     filepath: fileName,
//     webviewPath: photo.webPath
//   };*/
//   console.log("data save is " + data.id + typeof( data.photo_image));
//  // return image;
//  }

//  /***********************readimage as base64*************** */
//  private async readAsBase64(photo: Photo) {
//   // Fetch the photo, read as a blob, then convert to base64 format
//   const response = await fetch(photo.webPath!);
//   const blob = await response.blob();

//   return await this.convertBlobToBase64(blob) as string;
// }

// private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.onerror = reject;
//   reader.onload = () => {
//       resolve(reader.result);
//   };
//   reader.readAsDataURL(blob);
// });

// }

// /******************userphoto interface***************** */
// export interface UserPhoto {
//   filepath: string;
//   webviewPath?: string;
// }