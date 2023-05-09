import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-all-grilling',
  templateUrl: './all-grilling.page.html',
  styleUrls: ['./all-grilling.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AllGrillingPage implements OnInit {
  catId: any;
  places: any ;
  details:any;
  result: any= [];
  image='';
  categorie:any;
  constructor(private route: Router,private cat: CategorieService,private hp:HttpServiceService) { }

  ngOnInit() {
    this.getPLaceByIdCategorie();
  }
  /****************categorie************* */
  getCatList(){
    this.cat.allList().subscribe(
      cats =>{
        this.categorie=cats;
        console.log(cats);
      }
    );
  }
  /************searchplace by categorie id************* */
    getPLaceByIdCategorie(){
      
      this.catId=localStorage.getItem('infos');
      this.cat.listPlacesByIdCategorie().subscribe(
      
         (p) =>{
          this.places=p

        this.details=this.places.filter((item:any) => item.category == this.catId[6]);
        console.log("details", this.details);
        this.result =  this.cat.PlacesList(this.details);
        console.log("result",this.result);

    });
    console.log(this.catId[6]);
    }

    /*********filter list********* */


  goToDinner(){
    this.route.navigate(['/all-grilling']);
  }
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
  }
  gotoDetails(det:any){
    this.details= localStorage.setItem('details',JSON.stringify(det));

    this.route.navigate(['/grilling-details']);
  }
  gotoCart(){
    this.route.navigate(['/cart1']);
  }
  gotoPlaceList(){
    this.route.navigate(['/places-list']);
  }
}
