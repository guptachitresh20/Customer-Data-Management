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

  Register()
  {
    if(this.RegisterForm.valid)
    {
      this.auth.SignUp(this.RegisterForm.value).subscribe((result)=>{
        if(result)
        {
          alertify.set('notifier','position', 'top-right');
          alertify.success("Registeration Successful");
          this.RegisterForm.reset();
          this.router.navigate(['login']);
        }
      },
      (error)=>{
        alertify.set('notifier','position', 'top-right');
        alertify.error("Cannot Register! User credentials already exist!");
      })
    }
    else{
      alertify.set('notifier','position', 'top-right');
      alertify.error("Invalid Form");
    }
  }





  RegisterForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    Checkbox: new FormControl('',[Validators.required])
  });

  get Email() {
    return this.RegisterForm.get('Email');
  }
  get Name() {
    return this.RegisterForm.get('Name');
  }
  get Password() {
    return this.RegisterForm.get('Password');
  }
  get Phone() {
    return this.RegisterForm.get('Phone');
  }
  get Checkbox() {
    return this.RegisterForm.get('Checkbox');
  }
}
