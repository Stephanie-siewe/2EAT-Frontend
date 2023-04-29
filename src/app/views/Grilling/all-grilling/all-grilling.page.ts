import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-grilling',
  templateUrl: './all-grilling.page.html',
  styleUrls: ['./all-grilling.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AllGrillingPage implements OnInit {
  constructor(private route: Router) { }

  ngOnInit() {
  }
  goToDinner(){
    this.route.navigate(['/all-grilling']);
  }
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
  }
  gotoDetails(){
    this.route.navigate(['/grilling-details']);
  }
  gotoCart(){
    this.route.navigate(['/cart1']);
  }
  gotoFastFoodList(){
    this.route.navigate(['/places-list']);
  }
}
