import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, DisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/customer';

  addCustomer(data:Customer){
    return this.http.post(this.apiurl, data);
  }
  getCustomer() : Observable<DisplayCustomer>{
    return this.http.get(this.apiurl);
  }
  
  getCustomerbyId(id:any): Observable<Customer>{
    return this.http.get<Customer>(`${this.apiurl}/${id}`);
  }

  deleteCustomerbyId(id:any){
    return this.http.delete<Customer>(`${this.apiurl}/${id}`);
  }
  updateCustomer(id:any, customerData:Customer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  
}
