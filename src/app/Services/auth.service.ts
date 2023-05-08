import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../class/base-url';


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

  constructor(private _http:HttpClient) { }


  async save(user:any){
    return this._http.post(this.baseUrl.url+"/registration",user,this.baseUrl.httOptions).toPromise()
  }

  login(data:any){
    return this._http.post(this.baseUrl.url+"/login",data,this.baseUrl.httOptions);
  }
  logout(data:any){

  }
  changeInfos(data:any){
    return this._http.post(this.baseUrl.url+"/user/changeinfo",data,this.baseUrl.httOptions);
  }

  async changeImage(data:any){
    this._http.post(this.baseUrl.url+"/user/changeimage",data,this.baseUrl.httOptions).toPromise().then((el)=>{
      console.log('response',el);
      return el
    });
  }
  verifyToken(token:any){
    return this._http.post(this.baseUrl.url+"/validity",token,this.baseUrl.httOptions);
  }
  getUserInfos(id:number){
    return this._http.get(this.baseUrl.url+"/users/"+id +"/",this.baseUrl.httOptions);
  }
}

