import { Injectable } from '@angular/core';
import{Storage}from'@ionic/storage';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  private _storage : Storage | null = null;
  constructor(private storage:Storage) {this.init(); }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key:string, value:any){
    let result = await this._storage?.set(key, value);
    console.log(result);
    return (result);
  }

  async get(key:string){
    let value = await this._storage?.get(key);
    console.log('value',value);
    return value;
    
  }

  async remove(key:string){
    let value = await this._storage?.remove(key);

  }

  async clear(){
    let value = await this._storage?.clear();
  }

  async keys(key:string){
    let value = await this._storage?.keys();
    return value
  }

  
}
