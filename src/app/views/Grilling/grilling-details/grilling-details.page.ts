import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grilling-details',
  templateUrl: './grilling-details.page.html',
  styleUrls: ['./grilling-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GrillingDetailsPage implements OnInit {
 show: any;
 isModalOpen = false;
 
  constructor(private route: Router) { }

  ngOnInit() {
    this.show = 0;
  }
  /**************Save dishes************************** */
  saveDish(){
    this.show = 1;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  /*******************Routes************************ */
  CommentsPage(){
    this.route.navigate(['/comment']);
  }
}
