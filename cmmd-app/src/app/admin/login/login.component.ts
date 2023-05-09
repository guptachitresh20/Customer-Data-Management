import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { IAdmin } from 'src/app/data-types';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  adminDetails:IAdmin;


  constructor(private auth:AuthService, private router : Router){}

  login(){
    if(this.loginForm.valid)
    {
      this.getAdmin();
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.success("Logged In");
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


  getAdmin()
  {
    this.auth.getAdmin(this.loginForm.value.email).subscribe((result)=>{
      if(result)
      {
        this.adminDetails=result;
        localStorage.setItem('adminName',this.adminDetails.name);
      }
    })
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
