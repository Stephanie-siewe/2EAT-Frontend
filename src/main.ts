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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { GoogleMap } from '@capacitor-community/google-maps';


if (environment.production) {
      enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    importProvidersFrom(IonicModule.forRoot({}),HttpClientModule,FormsModule,Ng2SearchPipeModule),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'user',
      driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB]
    })),

    provideRouter(routes),
    
  ],
});


declare var google: any;

// Clé d'API Google Maps
// const apikey = 'AIzaSyDs8n2tabI8t14aR0YlxWQY6D5BBp1Huh0 ';

// const options = {
//   apiKey: apikey,
//   // autres options de configuration
// };

// const loadGoogleMaps = (options: any) => {
//   return new Promise<void>((resolve, reject) => {
//     if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
//       const script = document.createElement('script');
//       script.id = 'google-maps';

//       // URL de chargement de l'API Google Maps avec les options de configuration
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${options.apiKey}&libraries=${options.libraries}`;

//       // Callback à exécuter une fois que l'API Google Maps est chargée
//       script.onload = () => {
//         resolve();
//       };

//       // Gestion de l'erreur de chargement de l'API Google Maps
//       script.onerror = () => {
//         reject(new Error('Failed to load Google Maps API'));
//       };

//       document.body.appendChild(script);
//     } else {
//       resolve();
//     }
//   });
// };


// loadGoogleMaps(options).then(() => {
//   if (environment.production) {
//     enableProdMode();
//   }
// })
