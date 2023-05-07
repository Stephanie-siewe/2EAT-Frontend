import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-optionscamera',
  templateUrl: './optionscamera.page.html',
  styleUrls: ['./optionscamera.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OptionscameraPage implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }
  startCapture(type:any) {
    this.modalController.dismiss(type, 'select');
  }

 
}
