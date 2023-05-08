import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';
import { AuthService } from 'src/app/Services/auth.service';
import { log } from 'console';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {
   firstopen!:number
  constructor(public route:Router, public db:DbService, public auth:AuthService) { 
    this.direction()
  }

  ngOnInit() {
  }

  async direction(){
    this.firstopen = await this.db.get('firstopen');
    console.log('firstopen',this.firstopen);
    

    if (this.firstopen==undefined){
      setTimeout(()=>{
        this.route.navigateByUrl('/login')
      },6300);
    }

    else{
       let token = await this.db.get('token')
        console.log('token',token);
        const tok = {
          token : token
        }
       this.auth.verifyToken(tok).subscribe(async (res)=>{
        let is_expired = res;

        if (is_expired == false){
          setTimeout(()=>{
            this.route.navigateByUrl('/tabs/home')
          },6300);
        }
        else{
          let username = await this.db.get('username')
          let password = await this.db.get('password')

          const userData = {
            username:username,
            password:password
          }

          this.auth.login(userData).subscribe(res=>{
            console.log('response',res);
            setTimeout(()=>{
              this.route.navigateByUrl('/tabs/home')
            },6300);
            
        },err=>{
          console.log("error",err.error)
         
        })
        }


       })
    }

  }

}
