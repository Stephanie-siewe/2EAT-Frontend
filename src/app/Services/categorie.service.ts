import { Injectable } from '@angular/core';
import { BaseUrl } from '../class/base-url';
import { HttpClient } from '@angular/common/http';
import { PlacesListPage } from '../views/Places/places-list/places-list.page';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  baseUrl =  new BaseUrl();
  list:any;
  listDish: any;
  constructor(private _http:HttpClient, private hp:HttpServiceService) { }
  allList(){
    return this._http.get(this.baseUrl.url+"/place/categorie/",this.baseUrl.httOptions);
  }

  listPlacesByIdCategorie(){
    return this._http.get(this.baseUrl.url+"/place/listnoteplace",this.baseUrl.httOptions);
  }

  PlacesList(data:any):Observable<any>{
   let tab:any = [];
   this.hp.listPlaces().then((res:any)=>{
      this.list = res;
      console.log("list",this.list);

      data.forEach((d:any) => {
        let di ={};
        
        this.list.forEach((element:any) => {
          if(element.id == d.id){
            di = {
              id:element.id,
              picture:element.picture,
              note:d.moy,
              quarter:element.localisation.quarter,
              city:element.localisation.city,
              name:d.name
            }
            tab.push(di);
          }
          
        });
        
      }
      );
      
       // return tab
   });
   console.log("tab",tab);
   return tab;
  }

  PlacesListwithDish(data:any):Observable<any>{
    let tabdish:any = [];
    this.hp.listDishes().then((res:any)=>{
       this.listDish = res;
       console.log("listdish",this.listDish);
 
       data.forEach((d:any) => {
         let dish ={};
         
         this.listDish.forEach((element:any) => {
           if(element.place.id == d.id){

             dish = {
               id:d.id,
               dishes:element.name,
               dishpicture:element.picture,
               price:element.price,
               catid:element.place.category.id,
               placecat:element.place.category.name,
               username:element.place.user.username,
               useremail:element.place.user.email,
               userphone:element.place.user.phone_number,
               usercity:element.place.localisation.city,
               userquarter:element.place.localisation.quarter,
               userlong:element.place.localisation.longitude,
               userlat:element.place.localisation.latitude,
               quarter:d.quarter,
               city:d.city,
               placename:d.name,
               placedescription:element.place.description,
               noteplace:d.moy,
               placepicture:d.picture
             }
             tabdish.push(dish);
             console.log("tabdish",tabdish);

           }   
         }); 
     
       }
       );
    });
    console.log("tab",tabdish);
    return tabdish;
   }
  
}
