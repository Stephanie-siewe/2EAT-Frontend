import { Component, EnvironmentInjector, NgModule, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DbService } from './Services/db.service';
import { LangageService } from './Services/langage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule,HttpClientModule,TranslateModule],
})
export class AppComponent implements OnInit {

  lang:any[] =[];

  public environmentInjector = inject(EnvironmentInjector);

  constructor(public route:Router, public db:DbService,private lng:LangageService, private translate:TranslateService) {
    this.initapp();
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en','fr']);
    this.translate.use('en');
    this.translate.get('HELLO',{value:'world'}).subscribe((res:string) =>{

    });
    
  }
  ngOnInit(): void {
    this.lang= this.lng.getLanguages();
    console.log('lang',this.lng);  
  }

  initapp(){
    this.route.navigateByUrl('splash');  
  }
  Change(lg:string){
    this.lng.setLanguage(lg);
   }
   handleChange(env:any){
    console.log('env',env.target.value);
    this.lng.setLanguage(env.target.value);
   }
 
}
