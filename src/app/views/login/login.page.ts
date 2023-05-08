import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { DbService } from 'src/app/Services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private route: Router,private auth:AuthService, private formBuilder: FormBuilder, public db:DbService) { }

  loginForm! : FormGroup ;
  er = false;
  messageErrorApi = ''
  ngOnInit() {
    this.er = false;
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]],
    })
  }
  signUp(){
    this.route.navigate(['/sign']);
  }
  gotoPwd(){
    this.route.navigate(['/pwd']);
  }
  gotoloading(){
    this.route.navigate(['/loading']);
  }

  login(){
    const userData = {
      username:this.loginForm?.get('username')?.value,
      password:this.loginForm?.get('password')?.value
    };
    console.log('user',userData);
    this.auth.login(userData).subscribe((res:any) =>{
      this.db.set('username',userData.username);
      this.db.set('password',userData.password);

      this.db.set('token',res['token']);
      this.db.set('firstopen',0);
        this.er = false

        localStorage.setItem('user_id',res['user_id']);
        this.db.set('user_id',res['user_id']);
        // console.log('response',res['token']);
        this.db.set('firstopen',false)

        localStorage.setItem('name',userData.username);
        console.log('response',res);

        this.gotohome()
    },err=>{
      console.log("error",err.error)
      this.er = true;
      this.messageErrorApi = err.error.error;
    })
  }
  gotohome(){
    this.route.navigate(['/tabs/home']);

  }

}
