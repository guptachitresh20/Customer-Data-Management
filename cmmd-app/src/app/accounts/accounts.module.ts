import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AddAccountComponent } from './add-account/add-account.component';



@NgModule({
  declarations: [
    AccountHomeComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
   AccountHomeComponent,
    AddAccountComponent
  ]
})
export class AccountsModule { }
