import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AccountHomeComponent,
    AddAccountComponent,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
   AccountHomeComponent,
    AddAccountComponent
  ]
})
export class AccountsModule { }
