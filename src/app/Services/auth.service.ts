import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../class/base-url';
import { DbService } from './db.service';


export interface User{
  username:string
  email:string
  password:string
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl =  new BaseUrl();
  userInfos:any;

  constructor(private _http:HttpClient,public db:DbService) { }


  async save(user:any){
    return this._http.post(this.baseUrl.url+"/registration",user,this.baseUrl.httOptions).toPromise()
  }

  login(data:any){
    return this._http.post(this.baseUrl.url+"/login",data,this.baseUrl.httOptions);
  }
  async logout(){
    let token = await this.db.get('token')
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this._http.post('/logout/', {}, { headers });
 
  }
  changeInfos(data:any){
    return this._http.post(this.baseUrl.url+"/user/changeinfo",data,this.baseUrl.httOptions);
  }

  async changeImage(data:any){
    return this._http.post(this.baseUrl.url+"/user/changeimage",data,this.baseUrl.httOptions);
  }
  verifyToken(token:any){
    return this._http.post(this.baseUrl.url+"/validity",token,this.baseUrl.httOptions);
  }
  getUserInfos(id:number){
    return this._http.get(this.baseUrl.url+"/users/"+id +"/",this.baseUrl.httOptions);
  }

  
}

