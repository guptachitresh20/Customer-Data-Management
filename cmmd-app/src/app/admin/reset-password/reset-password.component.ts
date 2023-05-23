import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAdmin } from 'src/app/data-types';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{

  adminDetails:IAdmin;

  constructor(private dialog:MatDialog, private auth:AuthService, private router:Router){}

  ResetPasswordForm = new FormGroup({
    Email: new FormControl(localStorage.getItem('adminEmail')),
    Password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
    NewPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]),
  });
  get Password() {
    return this.ResetPasswordForm.get('Password');
  }
  get NewPassword() {
    return this.ResetPasswordForm.get('NewPassword');
  }

  ResetPassword()
  {
    if(this.ResetPasswordForm.valid)
    {
      this.ResetPasswordForm.value.Email=this.ResetPasswordForm.value.Email.toString();
      this.ResetPasswordForm.value.Password=this.ResetPasswordForm.value.Password.toString();
      this.ResetPasswordForm.value.NewPassword=this.ResetPasswordForm.value.NewPassword.toString();
      this.auth.Reset(this.ResetPasswordForm.value).subscribe((result)=>{
        alertify.set('notifier','position', 'top-right');
        alertify.success("Password has been Reset");
        setTimeout(()=>{
          this.auth.SignOut();
          alertify.set('notifier','position', 'top-right');
          alertify.success("Please Login with the New Password");
        },1000);
      },
      (error)=>{
          alertify.set('notifier','position', 'top-right');
          alertify.error("Old Password does not match");
      });
    }
    this.Close();
  }

  Close()
  {
    this.dialog.closeAll();
  }


}
