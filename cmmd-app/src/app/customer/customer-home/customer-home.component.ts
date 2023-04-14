import { Component,ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, DisplayCustomer } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';




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

  constructor(private service:CustomerService){

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
  FunctionEdit(row:any){
    console.log(row);
  }
}
