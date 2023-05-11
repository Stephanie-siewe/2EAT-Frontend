import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import{IonicStorageModule}from'@ionic/storage-angular';
import{Drivers}from'@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LangageService } from './app/Services/langage.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



if (environment.production) {
      enableProdMode();
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
bootstrapApplication(AppComponent, {
  providers: [
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    importProvidersFrom(IonicModule.forRoot({}),HttpClientModule,FormsModule,Ng2SearchPipeModule,LangageService),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'user',
      driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB]
    })),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })),

    provideRouter(routes),
    
  ],
});


