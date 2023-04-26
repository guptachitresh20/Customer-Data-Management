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
  customer_id:string;

  constructor(private accountService: AccountService, private http:HttpClient, private route: ActivatedRoute, private dialog: MatDialog, private customerService:CustomerService){}

    
  title = 'map';

    
  lat = 22.4064172;
  long = 69.0750171;
  zoom=5;
  
  markers = [
        {
            lat: 28.8955152,
            lng: 76.60661099999993,
            label: 'Rohtak'
        },
        {
            lat: 23.0204978,
            lng: 72.4396548,
            label: 'Ahmedabad'
        },
        {
            lat: 22.2736308,
            lng: 70.7512555,
            label: 'Rajkot'
        }
    ];




  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let id=params.get('id');
      if(id)
      {
        this.customer_id=id;
      }
    })
    localStorage.setItem('id',this.customer_id);
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
    this.customerService.getCustomerbyId(this.customer_id).subscribe((result)=>{
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
      this.accountService.deleteAccountbyId(id).subscribe(async r => {
        alertify.error('Deleted Successfully');
        this.getList();
        await new Promise(f => setTimeout(f, 1000));
        window.location.reload();
      });
    }, function () {

    });

  }
}
