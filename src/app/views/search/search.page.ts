import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable, forkJoin, map, switchMap } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,Ng2SearchPipeModule]
})
export class SearchPage implements OnInit {
search: any;
results:any;
list:any;
result: any = [];
places:any = [];
notes: any = [];
term!:string;
  constructor(private route: Router, private cat:CategorieService, private http:HttpServiceService){ }

  ngOnInit() {
    // this.listPl();
   
  }

ionViewDidEnter(){
  this.essaiSteph();
}

listPl(){
  console.log("d1",this.search);
  this.cat.listPlacesByIdCategorie().subscribe(
    (p) =>{
      this.places=p
      console.log('places',this.places);
      
      this.results=this.cat.PlacesListwithDish(this.places);
      console.log("Finalresults",this.results);
    }); 
   
}


essaiSteph(){

//   this.http.listPlaces().subscribe( (res)=>{
//     this.places = res;
//     console.log('places',this.places);
    
     
//     this.http.listPlacesWithNote().subscribe((response)=>{
//       console.log('notes places', response);
//       this.notes = response;
//       this.result = this.places.map((place:any) =>{
//         // this.http.searchDishesByPlaceId(place.id).
//       const rating = this.notes.find((note:any)=>note.id == place.id);
//       console.log('rating',rating)
//       console.log('place',place);
//       return {
//         name:place.name,
//         note:rating,
//         category:place.category,
//         localisation:place.localisation,
//         picture: place.picture

//       }
     
      
//     }
//     )

//   });
//   console.log('result',this.result);
  
//   console.log('fin');
  
// })

forkJoin([
  this.http.listPlaces().pipe(map((data:any) => Array.from(data))),
  this.http.listPlacesWithNote().pipe(map((data:any) => Array.from(data)))
]).subscribe(([places, notes]) => {
  console.log('places', places);
  console.log('notes places', notes);

  this.result = places.map((place: any) => {
    const rating:any = notes.find((note: any) => note.id === place.id);
    return {
      name: place.name,
      note: rating.moy,
      category: place.category,
      localisation: place.localisation,
      picture: place.picture,
      dishes: []
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

  console.log('result', this.result);
});
});
}


  gotoDetails(obj:any){
    localStorage.setItem('detailsinfo', JSON.stringify(obj));
    this.route.navigate(['/grilling-details']);
  }
}
