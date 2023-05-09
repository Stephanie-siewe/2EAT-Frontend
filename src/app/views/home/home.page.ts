import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie.service';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  usr:any;
  categorie:any;
  name:any;
  constructor(private route: Router,private cat: CategorieService,private auth:AuthService) { }

  ngOnInit() {
    this.getUsrInfos();
    this.getCatList();
  }
  /**************get user info*********** */
  getUsrInfos(){
    this .usr =localStorage.getItem('user_id');
    this.auth.getUserInfos(this.usr).subscribe((res:any)=>{
      this.name =res;
      console.log("res",res);
      console.log("name",this.name.username);
    })
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

  gotomap(){
    this.route.navigate(['/map-page'])
  }
}
