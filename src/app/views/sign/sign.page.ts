import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public toastButtons = [
   
    {
      text: 'OK',
      role: 'cancel',
      handler: () => { this.handlerMessage = 'Dismiss clicked'; }
    }
  ];
  handlerMessage = '';
  roleMessage = '';

  setRoleMessage(event: any) {
    const { role } = event.detail
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
