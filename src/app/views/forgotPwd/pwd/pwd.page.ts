import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.page.html',
  styleUrls: ['./pwd.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PwdPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  gotoLogin(){
    this.route.navigate(['/login']);
  }

  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];
}
