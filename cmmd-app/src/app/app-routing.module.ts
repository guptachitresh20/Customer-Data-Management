import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { AccountHomeComponent } from './accounts/account-home/account-home.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path:'customer',
    component:CustomerHomeComponent
  },
  {
    path:'accounts',
    component:AccountHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
