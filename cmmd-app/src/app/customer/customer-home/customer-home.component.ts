import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAccountsPaginatedResults, IAdmin, ICustomer, IDisplayCustomer, ILogs, IPaginatedResults } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import * as alertify from 'alertifyjs';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  logs: ILogs={};
  customerList :  IDisplayCustomer[];
  dataSource: any;
  empdata: any;
  totalCustomer : any;
  customer:ICustomer;

  pageNumber:number =1;
  pageSize:number = 10;
  constructor(private customerService: CustomerService, private dialog: MatDialog, private auth:AuthService, public searchService:SearchService, private logService:LogsService) {
    this.searchService.invokeEvent.subscribe(value => {
      if(value){
       this.SearchCustomers(value); 
     }
     else{
      this.GetList();
     }
    });

    this.customerService.invokeEvent.subscribe(value=>{
      if(value)
      {
        this.GetList();
      }
    });
  }


  ngOnInit(): void {
    this.GetList();
  }

  GetList(){
    this.customerService.GetCustomer((this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IPaginatedResults<IDisplayCustomer>)=>{
      this.customerList = result.Items;
      this.totalCustomer = result.TotalCount;
    });
  }

  UpdateCustomer(id: string) {
    this.dialog.open(AddCustomerComponent, {
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      disableClose:true,
      data: {
        id: id,
        modalTitle: 'Update Customer Form',
        button: 'Update'
      }
    });
  }

  GetCustomerName(id)
  {
    this.customerService.GetCustomerbyId(id).subscribe((result:ICustomer)=>{
      this.customer=result;
    })
  }

  DeleteCustomer(id: string) {
    alertify.confirm("Delete Customer", "Do you want to delete this customer?", () => {
      this.GetCustomerName(id);
      this.customerService.DeleteCustomerbyId(id).subscribe(r => {
        alertify.set('notifier','position', 'top-right');
        alertify.error('Deleted Successfully');
        this.GetList();
        this.AddLog('Delete');
      },
      (error) => 
      {
        alertify.set('notifier','position', 'top-right');
        alertify.error("Customer has existing accounts");
      });
    }, function () {

    });

  }

  AddLog(action:string)
  {
    this.logs.CustomerName=this.customer.CustomerName;
    this.logs.AdminName=localStorage.getItem('adminName');
    this.logs.AccountName="-";
    this.logs.Action="Delete";
    this.logs.SectionModified='Customer';
    this.logs.Date=new Date().toString();
    this.logs.Time=new Date().toString();
    this.logService.AddLog(this.logs).subscribe((result)=>{
    });
  }

  OnPageChange(event:number){
    this.pageNumber=event;
    this.GetList();
  }


  SearchCustomers(value)
  {
      this.customerService.SearchCustomers(value).subscribe((result)=>{
          if(result)
          {
            this.customerList=result;
          }
      });
  }

}
