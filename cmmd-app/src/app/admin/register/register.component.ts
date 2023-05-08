import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(private auth:AuthService, private router:Router){}

  register()
  {
    if(this.registerForm.valid)
    {
      console.log(this.registerForm.value);
      this.auth.signUp(this.registerForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.success("Registeration Successful");
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      },
      (error)=>{
        alertify.error("Cannot Register.....User credentials already exist!");
      })
    }
    else{
      alertify.error("Form is not valid...Please fill the form correctly!")
    }
  }





  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    checkbox: new FormControl('',[Validators.required])
  });

  get email() {
    return this.registerForm.get('email');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get checkbox() {
    return this.registerForm.get('checkbox');
  }
}
