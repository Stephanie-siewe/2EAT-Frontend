import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import{IonicStorageModule}from'@ionic/storage-angular';
import{Drivers}from'@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}),HttpClientModule,FormsModule),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'user',
      driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB]
    })),
    provideRouter(routes),
  ],
});
