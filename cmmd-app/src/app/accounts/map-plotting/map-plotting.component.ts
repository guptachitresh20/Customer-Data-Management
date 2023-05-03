import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../data-types';

@Component({
  selector: 'app-map-plotting',
  templateUrl: './map-plotting.component.html',
  styleUrls: ['./map-plotting.component.css']
})
export class MapPlottingComponent implements OnInit{


 constructor(private customerService:CustomerService){}

  customerDetail:ICustomer;
  customer_id:string;  
  lat = 22.4064172;
  long = 69.0750171;
  zoom=3;
  logoutButton: any;

  ngOnInit(){
    this.getCustomerList();
  }

  getCustomerList(){
    this.customerService.getCustomerbyId(localStorage.getItem('id')).subscribe((result)=>{
      this.customerDetail = result;
      console.log(this.customerDetail.accounts);
    });
  }

  close(){

  }
}
