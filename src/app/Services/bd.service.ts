import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private storage: Storage) { }

  async initiliasationBd(){
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  setLogin(){
    this.storage.set('isLogin',true);
  }
  SaveLoginInfo(){
    
  }
}
