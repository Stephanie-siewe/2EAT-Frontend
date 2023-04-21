import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.page.html',
  styleUrls: ['./register-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPlacePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
