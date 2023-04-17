import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerComponent } from '../customer/add-customer/add-customer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog){}
  
  addCustomer(){
    this.dialog.open(AddCustomerComponent,{
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        modalTitle:"Add Customer Form",
        button:"Add"
      }
    });
  }

}