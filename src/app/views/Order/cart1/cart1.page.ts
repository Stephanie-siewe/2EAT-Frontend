import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart1',
  templateUrl: './cart1.page.html',
  styleUrls: ['./cart1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Cart1Page implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
  }
  gotocart(){
    this.route.navigate(['/commandes']);
  }
}
