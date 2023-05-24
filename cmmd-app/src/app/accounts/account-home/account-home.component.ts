import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component , Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccount, IAccountsPaginatedResults, ICustomer, IDisplayAccount, ILogs, IPaginatedResults } from 'src/app/data-types';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AddAccountComponent } from '../add-account/add-account.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';
import { GoogleMapComponent } from 'src/app/accounts/google-map/google-map.component';
import { MapPlottingComponent } from 'src/app/accounts/map-plotting/map-plotting.component';
import { LogsService } from 'src/app/services/logs.service';
import { SearchService } from 'src/app/services/search.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit{

  accountList :  IDisplayAccount[];
  dataSource: any;
  empdata: any;
  totalAccount : any;
  logs: ILogs={};
  account:IAccount;

  pageNumber:number =1;
  pageSize:number = 10;
  customerDetail:ICustomer;
  customer_id:string;

  constructor(private location:Location, private accountService: AccountService,private logService:LogsService, private http:HttpClient, private route: ActivatedRoute, private dialog: MatDialog, private customerService:CustomerService, public searchService:SearchService){
    this.searchService.invokeEvent.subscribe(value => {
      if(value){
       this.SearchAccounts(value); 
     }
     else{
      this.GetCustomerDetails();
     }
    });
    this.accountService.invokeEvent.subscribe(value=>{
      if(value)
      {
        this.GetCustomerDetails();
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let id=params.get('id');
      if(id)
      {
        this.customer_id=id;
      }
    })
    localStorage.setItem('id',this.customer_id);
    this.GetCustomerDetails();
  }

  GetCustomerDetails(){
    this.customerService.GetPagedCustomerbyId(this.customer_id,(this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IAccountsPaginatedResults)=>{
      if(result)
      {
        this.customerDetail=result.Item;
        this.accountList=result.Item.Accounts;
        this.totalAccount=result.TotalCount;
      }
    });
  }

  UpdateAccount(id: string) {
    this.dialog.open(AddAccountComponent, {
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      disableClose:true,
      data: {
        id: id,
        modalTitle: 'Update Account Form',
        button: 'Update'
      }

    });
  }

  GetAccountName(id)
  {
    this.accountService.GetAccountbyId(id).subscribe(async (result)=>{
      if(result){
        this.account=await result;
      }
    })
  }

  DeleteAccount(id: string) {
    alertify.confirm("Delete Account", "Do you want to delete this account?", () => {
      this.GetAccountName(id);
      this.accountService.DeleteAccountbyId(id).subscribe(async result => {
        alertify.set('notifier','position', 'top-right');
          alertify.error('Deleted Successfully');
          this.GetCustomerDetails();
          await new Promise(f => setTimeout(f, 1000));
          this.AddLog('Delete');
      });
    }, function () {

    });

  }

  AddLog(action:string)
  {
    this.logs.CustomerName=this.customerDetail.CustomerName;
    this.logs.AdminName=localStorage.getItem('adminName');
    this.logs.AccountName=this.account.AccountName;
    this.logs.Action=action;
    this.logs.SectionModified='Account';
    this.logs.Date=new Date().toString();
    this.logs.Time=new Date().toString();
    this.logService.AddLog(this.logs).subscribe((result)=>{
    });
  }

  PlotOnMap()
  {
    if(this.customerDetail.Accounts.length!==0)
    {
      this.dialog.open(MapPlottingComponent, {
        height: '50vh',
        width:'50vw', 
        backdropClass:"backgroundblur" 
      });
    }
    else{
      alertify.set('notifier','position', 'top-right');
      alertify.error('No Accounts to Plot');
    }
  }
  CloseDialog(sendData:any)
  {
    this.dialog.closeAll();
  }

  BackButton()
  {
    this.location.back();
  }

  OnPageChange(event:number){
    this.pageNumber=event;
    this.GetCustomerDetails();
  }

  SearchAccounts(value)
  {
    this.accountService.SearchAccounts(value,this.customer_id).subscribe((result)=>{
        if(result)
        {
          this.accountList=result;
        }
    });
  }

}
