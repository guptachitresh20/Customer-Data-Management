import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';



@NgModule({
  declarations: [
    AccountHomeComponent,
    AddAccountComponent,
    AccountDetailComponent
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
