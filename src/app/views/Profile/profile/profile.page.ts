import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(private route: Router, private db:DbService, private auth:AuthService) { }

  ngOnInit() {
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

  logout(){

    
  }
}
