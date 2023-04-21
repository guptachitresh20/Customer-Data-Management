import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICustomer, IDisplayCustomer } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import * as alertify from 'alertifyjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {



  customerList :  IDisplayCustomer[];
  dataSource: any;
  empdata: any;
  totalCustomer : any;


  p:number =1;
  itemsPerPage:number = 10;
  totalProduct:any;
  constructor(private service: CustomerService, private dialog: MatDialog, private search:SearchService) {

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
      data: {
        id: id,
        modalTitle: 'Update Customer Form',
        button: 'Update'
      }

    });
  }

  deleteCustomer(id: string) {
    alertify.confirm("Delete Customer", "Do you want to delete this customer?", () => {
      this.service.deleteCustomerbyId(id).subscribe(r => {
        alertify.error('Deleted Successfully');
        this.getList();
      },
      (error) => 
      {
        alertify.error("Customer has existing accounts");
      });
    }, function () {

    });

  }

  // searchCustomer(enteredSearch)
  // {
  //   console.log("a: "+enteredSearch);
  //   if(enteredSearch)
  //   {
  //   this.service.searchCustomers(enteredSearch).subscribe((result)=>{
  //     if(result)
  //     {
  //       this.customerList = result;
  //       this.totalCustomer = result.length;
  //     }
  //   })
  // }
  // }

}
