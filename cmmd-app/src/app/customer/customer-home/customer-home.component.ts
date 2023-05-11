import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAdmin, ICustomer, IDisplayCustomer, ILogs } from 'src/app/data-types';
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

  p:number =1;
  itemsPerPage:number = 10;
  totalProduct:any;
  constructor(private service: CustomerService, private dialog: MatDialog,    private auth:AuthService, public search:SearchService, private logService:LogsService) {

  }


  ngOnInit(): void {
    this.getList();
  }


  

  getList(){
    this.service.getCustomer().subscribe((result)=>{
      this.customerList = result;
      this.totalCustomer = result.length;
    });
  }

  editCustomer(id: string) {
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

  getCustomerName(id)
  {
    this.service.getCustomerbyId(id).subscribe((result)=>{
      this.customer=result;
    })
  }

  deleteCustomer(id: string) {
    alertify.confirm("Delete Customer", "Do you want to delete this customer?", () => {
      this.getCustomerName(id);
      this.service.deleteCustomerbyId(id).subscribe(r => {
        alertify.set('notifier','position', 'top-right');
        alertify.error('Deleted Successfully');
        this.getList();
        this.logs.customerName=this.customer.cname;
        this.logs.adminName=localStorage.getItem('adminName');
        this.logs.accountName="-";
        this.logs.action="Delete";
        this.logs.sectionModified='Customer';
        this.logs.date=new Date().toString();
        this.logs.time=new Date().toString();
        this.logService.addLog(this.logs).subscribe((result)=>{
          if(result)
          {
            console.log(result);
          }
        });
      },
      (error) => 
      {
        alertify.set('notifier','position', 'top-right');
        alertify.error("Customer has existing accounts");
      });
    }, function () {

    });

  }

}
