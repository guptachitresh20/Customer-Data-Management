import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService, private router : Router){}

  login(){
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.success("Login Successful");
          this.loginForm.reset();
          this.auth.storeToken(result.token);
          this.router.navigate(['customer']);
        }
      },
      (error)=>{
        alertify.error("Please check your email id or password!")
      })
    }
    else{
      alertify.error("Form is not valid...Please fill the form correctly!")
    }
  }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
