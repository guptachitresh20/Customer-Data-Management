import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cmmd-app';

  constructor(private dialog: MatDialog){}

  addCustomer(){
    this.dialog.open(AddCustomerComponent,{
      width:"45%",
      minHeight: 'calc(100vh - 120px)',
      height : 'auto',
      backdropClass: "backgroundblur",
     
    });
  }
 
}
