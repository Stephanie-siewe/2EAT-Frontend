import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/Services/http-service.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,Ng2SearchPipeModule]
})
export class SearchPage implements OnInit {
search: any;
results:any;
list:any;
places:any = [];
term!:string;
  constructor(private route: Router, private cat:CategorieService){ }

  ngOnInit() {
    this.search=1;
    this.listPl();
  }



listPl(){
  console.log("d1",this.search);
  this.cat.listPlacesByIdCategorie().subscribe(
    (p) =>{
      this.places=p
      console.log("listnote",this.places);
      this.results=this.cat.PlacesListwithDish(this.places);
      console.log("Finalresults",this.results);
    });
    
  
   
   
}



/*
   listNote():Observable<any>{
    let listTab:any =[];
    this.cat.listPlacesByIdCategorie().subscribe(
      (p) =>{
        listTab=p
        console.log("listtab",listTab);
      });
    //  console.log("listTab", listTab);
    return listTab;
  }*/
 /* listNote(){
    this.cat.listPlacesByIdCategorie().subscribe( 
      (p) =>{
       //this.places=p
       console.log("listnote",p);
       /*
       this.cat.PlacesList(p).subscribe((res:any)=>{
        this.places = res;
        console.log("places",this.places);
        
        return this.places;
       })
       */
      /* this.cat.PlacesList(p).toPromise().then((res:any)=>{
        this.places = res;
        console.log("places",this.places);
        console.log("listnote1",p);
       })
      

  }*/
   /*placeList(){
    this.listNote().pipe(
      switchMap((result: any[]) => this.cat.PlacesList(result) )
     ).subscribe(
      (result: any[]) =>{
         console.log("result",result)})
  }  */
    /*let c = await this.listNote()
    console.log("pla",c );
    this.search=1;*/
    /*this.cat.PlacesList().subscribe((res:any)=>{
      this.list = res;
      console.log("listresearch",this.list);
    });*/
  

  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    //this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  gotoDetails(obj:any){
    localStorage.setItem('detailPlace', JSON.stringify(obj));
    this.route.navigate(['/grilling-details']);
  }
}
