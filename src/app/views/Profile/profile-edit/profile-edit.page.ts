import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/Services/photo.service';
import { Profile } from 'src/app/class/profile';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ProfileEditPage implements OnInit {
  image: any = '';
  person: Profile = new Profile(); 
  isUpload = false;
  constructor(private route: Router, public photoService: PhotoService) { }

  ngOnInit() {
    this.image= '';
  }
  
  backtoSettings(){
    this.route.navigate(['/tabs/profile'])
  }
/***************updateProfile**********************/
  updateProfile(person: Profile){
    
  }
  /*****************AddPhotoToGallery******************** */
  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(
      data => {
        this.image = data;
        console.log("data is "+ data);
      }
    );
  }

}
