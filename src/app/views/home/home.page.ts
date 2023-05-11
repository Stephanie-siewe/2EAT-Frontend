import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/categorie.service';
import { LangageService } from 'src/app/Services/langage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,TranslateModule]
})
export class HomePage implements OnInit {
  usr:any;
  categorie:any;
  lang:any[] =[];
  constructor(private route: Router,private cat: CategorieService, private lng:LangageService, private translate:TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en','fr']);
    this.translate.use('en');
    this.translate.get('HELLO',{value:'world'}).subscribe((res:string) =>{

    });
     
   }

   Change(lg:string){
    this.lng.setLanguage(lg);
   }
   handleChange(env:any){
    console.log('env',env.target.value);
    this.lng.setLanguage(env.target.value);
   }

  ngOnInit() {
    this.getUsrInfos();
    this.getCatList();
    this.lang= this.lng.getLanguages();
    console.log('lang',this.lng);   
  }
  /**************get user info*********** */
  getUsrInfos(){
    this.usr =localStorage.getItem('user_name');
    console.log(this.usr);
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
