import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/data-types';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent {
  customerDetail:ICustomer;


  constructor(private customer: CustomerService, private http:HttpClient, private route: ActivatedRoute){}

  getCustomerData(id:string){
    this.customer.getCustomerDetail(id).subscribe((result)=>{
      this.customerDetail = result;
    });
  }

  ngOnInit():void{
    const id= this.route.snapshot.params['id'];
    this.getCustomerData(id);
  }
}
