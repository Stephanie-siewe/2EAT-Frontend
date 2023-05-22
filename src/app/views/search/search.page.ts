import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable, switchMap } from 'rxjs';


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
places:any = [];
term!:string;
  constructor(private route: Router, private cat:CategorieService){ }

  ngOnInit() {
    this.listPl();
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


  gotoDetails(obj:any){
    localStorage.setItem('detailsinfo', JSON.stringify(obj));
    this.route.navigate(['/grilling-details']);
  }
}
