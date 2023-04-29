import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  login(){
    this.route.navigate(['/login']);
  }

  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];

  
}
