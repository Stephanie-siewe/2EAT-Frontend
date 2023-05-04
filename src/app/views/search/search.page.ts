import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
search: any;
  constructor(private route: Router){ }

  ngOnInit() {
    this.search=1;
  }

  handleChange(event:any) {
    this.search=1;
    const query = event.target.value.toLowerCase();
  }

  gotoDetails(){
    this.route.navigate(['/grilling-details']);
  }
}
