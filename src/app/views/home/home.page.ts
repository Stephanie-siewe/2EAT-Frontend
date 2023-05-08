import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  username:any;
  categorie:any;
  constructor(private route: Router,private cat:CategorieService) { }

  ngOnInit() {
    this .username =localStorage.getItem('name');
    this.getCatList();
  }
  /*************get categrories list******** */
  getCatList(){
    this.cat.allList().subscribe(
      cats =>{
        this.categorie=cats;
        console.log(cats);
      }
    );
  }
  goToDinner(obj:any){
    localStorage.setItem('infos',JSON.stringify(obj));
    this.route.navigate(['/all-grilling']);
  }
  gotoSearch(){
    this.route.navigate(['/tabs/search']);

  }
  gotoProfile(){
    this.route.navigate(['/tabs/profile']);
  }
}
