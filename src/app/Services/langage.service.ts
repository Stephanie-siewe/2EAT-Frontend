import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const KEY_LNG = 'SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class LangageService {
  APP_CONTENT: [] = [];
  selected='';
  obj: any = {};
  lng='';

  constructor(private translate: TranslateService) { }

  getLanguages(){
    return [
      {value:'fr',text:'FR'},
      {value:'en',text:'EN'}
    ]
  }

  setLanguage(lang: string){
    this.translate.use(lang);
    console.log("langauge change",lang);
    
  }
}
