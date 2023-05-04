import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlacesListPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  gotoPlaceEdit(){
    this.route.navigate(['/place-edit']);
  }
  
  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];

}
