import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-grilling-details',
  templateUrl: './grilling-details.page.html',
  styleUrls: ['./grilling-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GrillingDetailsPage implements OnInit {

  
rating() {

}
 show: any;
 isModalOpen = false;
image:any= '';
dishForm:FormGroup;
 
  constructor(private route: Router, public actionSheetController: ActionSheetController,private fb: FormBuilder,
    private modalcontroller:ModalController) {
    this.dishForm = this.fb.group({
      add:this.fb.array([]),
    });
   }

  ngOnInit() {
    this.show = 0;
  }


  /**************Save dishes************************** */
  saveDish(){
    this.show = 1;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
  /******************add dish************************* */
  add() : FormArray {  
    return this.dishForm.get("add") as FormArray  }

  newDish(): FormGroup {  
    return this.fb.group({  
      name: '',  
      price: '',  
    })  
  }  

  addDish(){
    this.add().push(this.newDish());
  }

  removeDish(i:number) {  
    this.add().removeAt(i);  
  }  

  onSubmit() {  
    console.log(this.dishForm.value);  
  }
/***************************Add to cart *************** */
addtoCart(){
  this.route.navigate(['/commandes']);
}
  /*******************Routes************************ */
  CommentsPage(){
    this.route.navigate(['/comments']);
  }


  //*******************Rating*************************** */
  stars: string[] = ['star-outline', 'star-outline', 'star-outline', 'star-outline', 'star-outline'];
  selectedRating!: number;


  selectRating(star: string) {
    const index = this.stars.indexOf(star);
    this.stars = this.stars.map((_, i) => (i <= index ? 'star' : 'star-outline'));
    this.selectedRating = index + 1;
    
  }

  isSelected(star: string): boolean {
    return this.stars.includes(star);
  }

  submitRating() {
    // Envoyer la note sélectionnée à votre backend ou effectuer une action supplémentaire
    this.modalcontroller.dismiss(this.selectedRating);
    console.log(this.selectedRating);
  }
}
