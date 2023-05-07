import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { log } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private route: Router,private auth:AuthService, private formBuilder: FormBuilder) { }

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
    this.auth.login(userData).subscribe(res=>{
        this.er = false
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
