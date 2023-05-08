import { Injectable } from '@angular/core';
import { BaseUrl } from '../class/base-url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  baseUrl =  new BaseUrl();
  constructor(private _http:HttpClient) { }
  allList(){
    return this._http.get(this.baseUrl.url+"/place/categorie",this.baseUrl.httOptions);
  }

  listPlacesByIdCategorie(id:any){
    return this._http.get(this.baseUrl.url+"searchplacesbycategory/"+ id,this.baseUrl.httOptions);
  }
}
