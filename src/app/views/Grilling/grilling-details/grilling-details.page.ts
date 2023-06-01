import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-grilling-details',
  templateUrl: './grilling-details.page.html',
  styleUrls: ['./grilling-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GrillingDetailsPage implements OnInit {

commandes = new Array();

 show: any;
 isModalOpen = false;
image:any= '';
details:any;
dishes:any;
note:any;
listD:any;
noted = false;
place:any;
user_id:number;


 
  constructor(private route: Router, public actionSheetController: ActionSheetController,private fb: FormBuilder,
    private modalcontroller:ModalController,private hp:HttpServiceService) {
      this.place = JSON.parse(localStorage.getItem('place_selected')!)
      this.user_id = JSON.parse(localStorage.getItem('user_id')!)
      console.log('place', this.place)
   }


   ionViewDidEnter(){
    this.getDishesByIdPlace();

   }

  ngOnInit() {
    // this.show = 1;
    // this.details=JSON.parse(localStorage.getItem('detailsinfo')|| '{}');
    // this.getDishesByIdPlace();

    this.VerifyIfUserHadLikedPlace();

  }
/*****************list of dish for a place************ */
getDishesByIdPlace(){      
// this.hp.searchDishesByPlaceId(this.place.id).subscribe((res:any)=>{
//   this.dishes = res;
// })

const noteObservable = this.hp.getNote(this.place.id);
const dishesObservable = this.hp.searchDishesByPlaceId(this.place.id);


forkJoin([noteObservable, dishesObservable]).subscribe(([note, dishes]) => {
  this.dishes = dishes;
  let not:any = note;
  this.note = not.note
  
  console.log('Note:', this.note);
  console.log('Dishes:', dishes);
});


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
  addDish(){

  }

/*******************Add to cart *************** */
addtoCart(dish_id:number){
  let commandlocal = localStorage.getItem('orders');

  
    const order = {
        user:this.user_id,
        dish:dish_id
    };
    if(commandlocal == undefined){
      this.commandes.push(order);
    localStorage.setItem('orders',JSON.stringify(this.commandes));
    }
    else{
      this.commandes = JSON.parse(commandlocal);
      this.commandes.push(order);
      localStorage.setItem('orders',JSON.stringify(this.commandes));
    }
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
    
    this.hp.Rating(this.user_id,this.place.id,this.selectedRating).subscribe(res =>{
      console.log('note',this.selectedRating);
      console.log('response',res);
      this.modalcontroller.dismiss(this.selectedRating);
      this.ionViewDidEnter();
    })
    
    
  }


  VerifyIfUserHadLikedPlace(){
    this.hp.VerifyIfUserHadNotePlace(this.user_id,this.place.id).subscribe((res:any)=>{
      this.noted = res.response;
    })
  }
}
