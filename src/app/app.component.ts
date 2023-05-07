import { Component, EnvironmentInjector, NgModule, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule,HttpClientModule],
})
export class AppComponent {

 
  public environmentInjector = inject(EnvironmentInjector);

  constructor(public route:Router) {

    this.initapp();
  }

  initapp(){
    this.route.navigateByUrl('splash');
  }
 
}
