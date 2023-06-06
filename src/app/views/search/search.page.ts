import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PhotoService } from 'src/app/Services/photo.service';
import { MapPagePage } from '../map-page/map-page.page';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/Services/auth.service';
import { log } from 'console';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, Ng2SearchPipeModule,ReactiveFormsModule,TranslateModule],
})
export class SearchPage implements OnInit {
  search: any;
  results: any;
  list: any;
  picture_user:any;
  categorie: any;
  comefromhome = 0;
  choice: any;
  result: any = [];
  places: any = [];
  notes: any = [];
  term!: string;
  catId: any;
  listcat: any = [];
  user_id:number;

  constructor(
    private route: Router,
    private http: HttpServiceService,
    private modalcontroller:ModalController,
    private photoService:PhotoService,
    private Auth:AuthService
  ) {
    this.categorie = JSON.parse(localStorage.getItem('categorie')!);
    this.user_id = JSON.parse(localStorage.getItem('user_id')!);
 
    if(this.categorie.id == null){
       this.listcat= this.result;
       console.log('bon',this.listcat);
     }
  }

  ngOnInit() {
   // this.search=0;

   
}
  ionViewDidEnter(){
    this.essaiSteph();
  }
    

  ionViewDidLeave() {
    localStorage.removeItem('categorie');
  }

  essaiSteph() {
    forkJoin([
      this.http.listPlaces().pipe(map((data: any) => Array.from(data))),
      this.http.listPlacesWithNote().pipe(map((data: any) => Array.from(data))),
    ]).subscribe(([places, notes]) => {

      this.result = places.map((place: any) => {
        const rating: any = notes.find((note: any) => note.id === place.id);
        return {
          name: place.name,
          note: rating.moy,
          category: place.category,
          localisation: place.localisation,
          picture: place.picture,
          dishes: [],
        };
      });
     /* if(this.categorie.id = undefined){
        this.search=1;
        this.listcat=this.result ; 
        console.log('bon');
        
      }else{
        this.search=1;
        
        console.log('bad');
      }*/

        this.listcat=this.result.filter((item: any) => item.category.id == this.categorie.id);  
         console.log('uz',this.listcat);
         if((this.listcat = undefined)){
          this.search =0;
          console.log('s1',this.search);
  
        }else{
          this.search=1;
          console.log('s2',this.search);
        }
         
       });
  }
  allList() {
   this.listcat=this.result ;    
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

  gotoDetails(obj:any){
    localStorage.setItem('place_selected', JSON.stringify(obj));
    this.route.navigate(['/grilling-details']);
  }

getuser(){
this.Auth.getUserInfos(this.user_id).subscribe((res:any)=>{
  this.picture_user = res.profile_image;
})
  }

  gotoProfile(){
    this.route.navigate(['/tabs/profile']);}
}
