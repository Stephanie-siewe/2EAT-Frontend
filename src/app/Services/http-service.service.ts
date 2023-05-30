import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from 'src/app/class/base-url';
import { log } from 'console';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  baseUrl =  new BaseUrl();
  userInfos:any;


  constructor(private _http:HttpClient) { }
  
  savePlace(data:any){
    return this._http.post(this.baseUrl.url+"/place/add/place",data,this.baseUrl.httOptions)
  }

  listPlaces(){
    return this._http.get(this.baseUrl.url+"/place/placesimple/",this.baseUrl.httOptions);
  }

  getNote(id:any){
    return this._http.get(this.baseUrl.url+ "/place/notebyplaceid/"+id,this.baseUrl.httOptions)
  }

  listPlacesWithNote(){
    return this._http.get(this.baseUrl.url+"/place/listnoteplace",this.baseUrl.httOptions);
  }

  getPlace(id:number){
    return this._http.get(this.baseUrl.url+"/place/placesimple/"+id+"/",this.baseUrl.httOptions);
  }


  deletePlace(id:number){
    return this._http.delete(this.baseUrl.url+"/place/delete/place/"+id,this.baseUrl.httOptions)
  }

  modifyPicturePlace(data:any){
    return this._http.post(this.baseUrl.url+"/place/update/place/photo",data,this.baseUrl.httOptions)
  }

  modifyPlaceInformations(data:any){
    return this._http.post(this.baseUrl.url+"/place/update/place",data,this.baseUrl.httOptions)

  }

  searchPlacesByCategoryId(id:number){
    return this._http.get(this.baseUrl.url+"place/searchplacesbycategory/"+id,this.baseUrl.httOptions)
  }

  async nearPlaces(userLongitude:any,userLatitude:any){
   return this._http.get(this.baseUrl+"/place/searchbylocal"+ userLongitude+"/"+userLatitude,this.baseUrl.httOptions).toPromise();
  }

  async notePlace(userId:number,placeId:number,note:number){
    return this._http.get(this.baseUrl.url+"/place/noteplace/"+userId+"/"+placeId+"/"+note,this.baseUrl.httOptions).toPromise();
  }
  


  listCategories(){
    return this._http.get(this.baseUrl.url+"/place/categorie",this.baseUrl.httOptions);

  }

  
  async listDishes(){
    return this._http.get(this.baseUrl.url+"/place/dishsimple/",this.baseUrl.httOptions).toPromise();

  }



  async saveDish(data:any){
    this._http.post(this.baseUrl.url+"/place/add/dish",data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response', el);
      return el
      
    });

  }


  async modifyPictureDish(data:any){
    this._http.post(this.baseUrl+"/place/update/dish/photo",data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
      
    });
  }

  async modifyDishInformations(data:any){
    this._http.post(this.baseUrl+"/place/update/dish", data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
      
    });
  }


  searchDishesByPlaceId(id:any){
    return this._http.get(this.baseUrl.url+"/place/searchdishesbyplace/"+id,this.baseUrl.httOptions)
  }

  async deleteDish(id:number){
    this._http.delete(this.baseUrl.url+"/place/delete/dish/"+id,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
      
    });

  }
  

  async saveConstituent(data:any){
    this._http.post(this.baseUrl.url+"/place/add/consti",data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
      
    });
  }

  async modifyConstituent(data:any){
    this._http.post(this.baseUrl.url+"/place/update/consti",data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el  
    });
  }

  async searchConstiBydishId(id:number){
    return this._http.get(this.baseUrl.url+"/place/searchconstibydish"+id,this.baseUrl.httOptions).toPromise()
  }

  async deleteConsti(id:number){
    this._http.delete(this.baseUrl.url+"/place/delete/consti/"+id,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
      
    });
  }

  comment(data:any){
   return this._http.post(this.baseUrl.url+"/place/add/comment",data,this.baseUrl.httOptions);
  }

  commentlikebyUserId(user_id:number,comment_id:number){
    return this._http.get(this.baseUrl.url+"/place/checklikecomment/comment"+comment_id+"/user"+user_id,this.baseUrl.httOptions)
  }

  likeComment(comment_id:number,userId:any){
    return this._http.get(this.baseUrl.url+"/place/comments/"+comment_id+"/"+userId+"/like");
  }

  getCommentLike(comment_id:any){
    return this._http.get(this.baseUrl.url+"/place/comments/"+comment_id+"/likes-count",this.baseUrl.httOptions);
  }

  getCommentByIdPlace(id:any){
    return this._http.get(this.baseUrl.url+"/place/commentsplace/"+id,this.baseUrl.httOptions);
  }


}
