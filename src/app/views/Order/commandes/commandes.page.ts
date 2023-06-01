import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommandesPage implements OnInit {
  item_qty:any;
  commandes: any;
  dishWithInfos:any;

  constructor(private route: Router,private http:HttpServiceService) {
    this.commandes = JSON.parse(localStorage.getItem('orders')!);
    console.log('commandes', this.commandes);
    
   }

  ngOnInit() {
    this.item_qty=0;
  }

  gotodetails(){
    this.route.navigate(['/grilling-details']);
  }
  gotoSucess(){
    this.route.navigate(['/sucess-order']);
  }
  deleteDishFromCart(){
  }
  deleteOrderFromCart(){}
  /************toaster************* */
  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];
    /************plu-minus button************* */
    async onAdd(){
      this.item_qty += 1;
      console.log(this.item_qty);
    }
  
    async onSub(){
      if(this.item_qty-1 < 1){
        this.item_qty = 0;
        console.log('item_1->' + this.item_qty)
      }
      else{
        this.item_qty -= 1;
        console.log('item_2->' + this.item_qty);
      }
  
    }

    getListDishWithConstituent(){
      
      
    }

}
