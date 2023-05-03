import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  signUp(){
    this.route.navigate(['/sign']);
  }
  gotoPwd(){
    this.route.navigate(['/pwd']);
  }
  gotohome(){
    this.route.navigate(['/tabs/home']);
  }

}
