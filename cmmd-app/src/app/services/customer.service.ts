import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer, IDisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer_gstin:string;

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Customers';

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


  // searchCustomers(searchValue:string)
  // {
  //   return this.http.get<IDisplayCustomer[]>(`http://localhost:3000/customer?cname_like=${searchValue}`);
  // }
  
}
