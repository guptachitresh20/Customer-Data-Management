import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer, IDisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/customer';

  // to add customer 
  addCustomer(data:ICustomer){
    return this.http.post(this.apiurl, data);
  }
  // to get the list of all the customers
  getCustomer(){
    return this.http.get<IDisplayCustomer[]>(this.apiurl);
  }
  // to delete the customer 
  deleteCustomerbyId(id:any){
    return this.http.delete<ICustomer>(`${this.apiurl}/${id}`);
  }
  // to update the specific customer
  updateCustomer(id:any, customerData:ICustomer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  getCustomerbyId(id:any): Observable<ICustomer>{
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  // accounts
  // call when user click on specific customer row -> to fetch all the data of that specific customer
  getCustomerDetail(id:any){
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  
}
