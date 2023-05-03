import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { AccountHomeComponent } from './accounts/account-home/account-home.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "",
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "customer/:id/accounts/:accountid",
    component: AccountDetailComponent,
    data: { breadcrumb: 'Customer>Accounts>AccountDetail' }
  },
  {
    path: "customer/:id/accounts",
    component: AccountHomeComponent,
    data: { breadcrumb: 'Customer>Accounts' }
  },
  {
    path: "customer",
    component: CustomerHomeComponent,
    data: { breadcrumb: 'Customer' }
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
