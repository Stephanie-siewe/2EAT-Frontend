import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess-order',
  templateUrl: './sucess-order.page.html',
  styleUrls: ['./sucess-order.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SucessOrderPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  gotoCart(){
    this.route.navigate(['/cart1']);
  }
  gotoHome(){
    this.route.navigate(['/tabs/home']);
  }
}
