import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/Services/auth.service';
import { ToastService } from 'src/app/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,TranslateModule]
})


export class SignPage implements OnInit {

  constructor(private route: Router, private auth:AuthService, private formBuilder: FormBuilder, private toast:ToastService) { }
  
  registerForm! : FormGroup ;
  er = false;
  messageErrorApi = '';

  ngOnInit() {
  this.er = false;
    this.registerForm = this.formBuilder.group({
      email:['',Validators.required, Validators.email],

      password: ['',[Validators.required,Validators.minLength(6)]],

      confirm_password:['',[Validators.required,Validators.minLength(6)]],

      username:['',Validators.required],

    },{
      validators: this.passwordsMatchValidator,
    });

  }

  
  passwordsMatchValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;
    return password && confirm_password && password.value !== confirm_password.value ? { passwordMismatch: true } : null;
  
  }

  

//   validationUserMessage ={
//     email:[
//       {type:'required', message:'Please enter your Email'},
//       {type:"pattern", message:"The Email entered is Incorrect. Try again"}
//     ],

//     password: [
//       {type:"required", message:"Please enter your password!"},
//       {type:"minlength", message:"The Password must be at least 6 characters or more"}
//     ],

//     confirm_password:[
//       {type:"required", message:"Please confirm your password"},
//       {type:"pattern", message:"Does not same than password"}
//     ],

//     username: [
//       {type:"required", message:"Please enter your username!"},
//       {type:"pattern", message:"this username is already exists!"}

//     ],




// }
   

  sign(){

    const userData = {
      username: this.registerForm?.get('username')?.value,
      email:this.registerForm?.get('email')?.value,
      password:this.registerForm?.get('password')?.value
    };
    console.log('user',userData);

    this.auth.save(userData).then((response:any)=>
    {
      this.toast.presentToast("User Created Successfully !")
      console.log('response',response);      
      this.login()
      
    }).catch(error =>{
      console.log('error',error);
      this.er = true;
      this.messageErrorApi = error.error.username
    })
    
  }


  login(){
    this.route.navigate(['/login']);
  }

  /*public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    }
  ];*/

  
}
