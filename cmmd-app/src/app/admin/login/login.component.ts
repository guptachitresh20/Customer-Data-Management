import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  adminDetails:IAdmin;


  constructor(private auth:AuthService, private router : Router){}

  ngOnInit()
  {
    if(this.auth.GetToken())
    {
      this.router.navigate(['customer']);
    }
  }

  Login(){
    if(this.LoginForm.valid)
    {
      this.GetAdmin();
      this.auth.Login(this.LoginForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.set('notifier','position', 'top-right');
          alertify.success("Logged In");
          this.LoginForm.reset();
          this.auth.StoreToken(result.Token);
          this.router.navigate(['customer']);
        }
      },
      (error)=>{
        alertify.set('notifier','position', 'top-right');
        alertify.error("Please check your email id or password!")
      })
    }
    else{
      alertify.set('notifier','position', 'top-right');
      alertify.error("Invalid Form")
    }
  }


  GetAdmin()
  {
    this.auth.GetAdmin(this.LoginForm.value.Email).subscribe((result)=>{
      if(result)
      {
        this.adminDetails=result;
        localStorage.setItem('adminName',this.adminDetails.Name);
        localStorage.setItem('adminEmail',this.adminDetails.Email);

      }
    })
  }


  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });
  get Email() {
    return this.LoginForm.get('Email');
  }
  get Password() {
    return this.LoginForm.get('Password');
  }

}
