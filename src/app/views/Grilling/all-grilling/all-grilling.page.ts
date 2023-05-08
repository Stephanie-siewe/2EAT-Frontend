import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-all-grilling',
  templateUrl: './all-grilling.page.html',
  styleUrls: ['./all-grilling.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AllGrillingPage implements OnInit {
  catId: any;
  places: any;
  details:any;
  constructor(private route: Router,private cat: CategorieService) { }

  ngOnInit() {
    this.getPLaceByIdCategorie();
  }
  /************searchplace by categorie id************* */
    getPLaceByIdCategorie(){
      this.catId= JSON.stringify(localStorage.getItem('infos'));
      this.places = this.cat.listPlacesByIdCategorie(this.catId.id);
      console.log(this.places);
    }

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
