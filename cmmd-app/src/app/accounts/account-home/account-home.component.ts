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
       this.searchAccounts(value); 
     }
     else{
      this.getCustomerDetails();
     }
    });
    this.accountService.invokeEvent.subscribe(value=>{
      if(value)
      {
        this.getCustomerDetails();
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
    this.getCustomerDetails();
  }

  getCustomerDetails(){
    this.customerService.getPagedCustomerbyId(this.customer_id,(this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IAccountsPaginatedResults)=>{
      if(result)
      {
        console.log(result);
        this.customerDetail=result.item;
        console.log(this.customerDetail);
        this.accountList=result.item.accounts;
        this.totalAccount=result.totalCount;
      }
    });
  }

  editAccount(id: string) {
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

  getAccountName(id)
  {
    console.log(id);
    this.accountService.getAccountbyId(id).subscribe(async (result)=>{
      if(result){
        this.account=await result;
        console.log(this.account);
      }
    })
  }

  deleteAccount(id: string) {
    alertify.confirm("Delete Account", "Do you want to delete this account?", () => {
      this.getAccountName(id);
      this.accountService.deleteAccountbyId(id).subscribe(async result => {
        alertify.set('notifier','position', 'top-right');
          alertify.error('Deleted Successfully');
          this.getCustomerDetails();
          await new Promise(f => setTimeout(f, 1000));
          this.addLog('Delete');
      });
    }, function () {

    });

  }

  addLog(action:string)
  {
    this.logs.customerName=this.customerDetail.cname;
    this.logs.adminName=localStorage.getItem('adminName');
    this.logs.accountName=this.account.accountName;
    this.logs.action=action;
    this.logs.sectionModified='Account';
    this.logs.date=new Date().toString();
    this.logs.time=new Date().toString();
    this.logService.addLog(this.logs).subscribe((result)=>{
    if(result)
    {
      console.log(result);
    }
  });
  }

  plotOnMap()
  {
    if(this.customerDetail.accounts.length!==0)
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
    // console.log(this.customerDetail?.accounts);
  }
  closeDialog(sendData:any)
  {
    this.dialog.closeAll();
  }

  backButton()
  {
    this.location.back();
  }

  onPageChange(event:number){
    this.pageNumber=event;
    this.getCustomerDetails();
  }

  searchAccounts(value)
  {
    console.log(value);
    this.accountService.searchAccounts(value).subscribe((result)=>{
        if(result)
        {
          this.accountList=result;
          console.log(this.accountList);
        }
    });
  }

}
