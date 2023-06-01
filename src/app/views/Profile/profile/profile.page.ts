import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,TranslateModule]
})
export class ProfilePage implements OnInit {
  user_id:any;
  image: any = '';
  user: any = {};
  constructor(private route: Router, private db:DbService, private auth:AuthService) { 
    this.user_id = localStorage.getItem('user_id');
    this.auth.getUserInfos(this.user_id).subscribe((res:any)=>{
      this.user = res;
      console.log('response2',res);
      
    })
  }


  ionViewWillEnter(){
    this.auth.getUserInfos(this.user_id).subscribe((res:any)=>{
      this.user = res;
      console.log('response3',res);
      
    })
  }

  ngOnInit() {
    this.ionViewWillEnter()

  }
  gotoEditProfil(){
    this.route.navigate(['/profile-edit']);
  }
  gotoAddPlace(){
    this.route.navigate(['/add-place']);
  }
  gotoPlaceList(){
    this.route.navigate(['/places-list']);
  }
  goToAbout(){
    this.route.navigate(['/about']);
  }

  logout(){

    
  }
}
