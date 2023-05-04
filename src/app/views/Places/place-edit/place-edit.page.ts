import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.page.html',
  styleUrls: ['./place-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlaceEditPage implements OnInit {

  constructor(private route :Router) { }

  ngOnInit() {
  }
  gotoSettings(){
    this.route.navigate(['/tabs/profile']);
  }

}
