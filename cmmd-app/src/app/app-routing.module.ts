import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { AccountHomeComponent } from './accounts/account-home/account-home.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';

const routes: Routes = [
  {path: "", redirectTo: "customer", pathMatch:"full"},
  
  {
    path: "customer/:id/accounts/:accountid",
    component:AccountDetailComponent
  },
  {
    path: "customer/:id/accounts",
    component:AccountHomeComponent
  },
  {
    path: "customer",
    component:CustomerHomeComponent,
  }

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
