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
  categorie: any;
  comefromhome = 0;
  choice: any;
  result: any = [];
  places: any = [];
  notes: any = [];
  term!: string;
  catId: any;
  listcat: any = [];
  constructor(
    private route: Router,
    private http: HttpServiceService,
    private modalcontroller:ModalController,
    private photoService:PhotoService,
  ) {
    this.categorie = JSON.parse(localStorage.getItem('categorie')!);
    this.choice = JSON.parse(localStorage.getItem('Infos')!);
    if (this.choice == undefined) {
      this.comefromhome = 1;
    }
  }

  ngOnInit() {
    this.search=0;
    //  this.getListCategorie();
  }

  ionViewDidEnter() {
    this.catId = JSON.parse(localStorage.getItem('CatId')!);
    this.essaiSteph();
    this.allList();


    /*if ((this.comefromhome = 1)) {
      this.result = this.result.fitler(
        (data: any) => data.categorie.id == this.choice.id
      );
    }*/
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

        // this.http.searchDishesByPlaceId(place.id).subscribe((dishes: any[]) => {

        //   dishes.forEach((dish, index) =>{
        //     this.result[index].dishes = dish;
        //   })

        //   // Vérifier si tous les lieux ont été traités pour afficher les résultats
        //   if (this.result.length === places.length) {
        //     console.log('result', this.result);
        //   }
        // });
      });
      this.listcat=this.result.filter((item: any) => item.category.id == this.catId.id);
      if((this.listcat = [])){
        this.search =0;
        console.log('s1',this.search);

      }else{
        this.search=1;
        console.log('s2',this.search);
        
        console.log('test',this.listcat);
      }
      
     

    });
  }

  gotoDetails(obj: any) {
    localStorage.setItem('detailsinfo', JSON.stringify(obj));
    this.route.navigate(['/grilling-details']);
  }



  allList() {
    this.search=1;
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
}
