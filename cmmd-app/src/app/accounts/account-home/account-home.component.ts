import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccount, ICustomer, IDisplayAccount } from 'src/app/data-types';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AddAccountComponent } from '../add-account/add-account.component';
import { MatDialog } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent {

  accountList :  IDisplayAccount[];
  dataSource: any;
  empdata: any;
  totalAccount : any;


  p:number =1;
  itemsPerPage:number = 10;
  totalProduct:any;
  customerDetail:ICustomer;


  constructor(private accountService: AccountService, private http:HttpClient, private route: ActivatedRoute, private dialog: MatDialog, private customerService:CustomerService){}

  ngOnInit(): void {
    this.getCustomerList();
    this.getList();
  }

  getList(){
    this.accountService.getAccount().subscribe((result)=>{
      this.accountList = result;
      this.totalAccount = result.length;
  
    });
  }

  getCustomerList(){
    this.customerService.getCustomerbyId(1).subscribe((result)=>{
      this.customerDetail = result;
    });
  }

  editAccount(id: string) {
    this.dialog.open(AddAccountComponent, {
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data: {
        id: id,
        modalTitle: 'Update Account Form',
        button: 'Update'
      }

    });
  }

  deleteAccount(id: string) {
    console.log(id);
    alertify.confirm("Delete Customer", "Do you want to delete this customer?", () => {
      this.accountService.deleteAccountbyId(id).subscribe(r => {
        alertify.error('Deleted Successfully');
        this.getList();
      });
    }, function () {

    });

  }
}
