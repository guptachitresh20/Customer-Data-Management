import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer, DisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  addCustomer(data:ICustomer){
    return this.http.post("http://localhost:3000/customer", data);
  }
  getCustomer() : Observable<DisplayCustomer>{
    return this.http.get("http://localhost:3000/customer");
  }
  getCustomerbyid(id:string){
    return this.http.get(`http://localhost:3000/customer/${id}`);
  }
  updateCustomer(customer:ICustomer){
    return this.http.put<ICustomer>(`http://localhost:3000/customer/${customer.id}`,customer);
  }
}
