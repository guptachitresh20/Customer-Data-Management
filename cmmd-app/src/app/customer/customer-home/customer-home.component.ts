import { Component,ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, DisplayCustomer } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit{
  displayedColumns: string[] = ['cname', 'logo', 'gstin', 'phoneNo','action'];
  dataSource:any;
  empdata:any;

@ViewChild(MatPaginator) paginator !:MatPaginator;
@ViewChild(MatSort) sort :MatSort;

  constructor(private service:CustomerService, private dialog:MatDialog){

  }
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    this.service.getCustomer().subscribe(result => {
      this.empdata = result;
      this.dataSource = new MatTableDataSource<DisplayCustomer>(this.empdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  FilterChange(event:Event){
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filvalue;
  }

  getrow(row:any){
    // console.log(row);
  }
  editCustomer(id:string){
    this.dialog.open(AddCustomerComponent,{
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        id:id,
        modalTitle: 'Update Customer Form',
        button:'Update'
      }
      
    });
  }

  deleteCustomer(id:string){
    alertify.confirm("Delete Customer", "Do you want to delete this customer?",() =>{
      this.service.deleteCustomerbyId(id).subscribe(r=>{
        alertify.success('Deleted Successfully');
        this.GetAll();
      });
    }, function(){

    });
 
  }
}
