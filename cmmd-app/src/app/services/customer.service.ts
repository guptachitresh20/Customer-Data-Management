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

  addCustomer(data:ICustomer){
    return this.http.post(this.apiurl, data);
  }
  getCustomer() : Observable<IDisplayCustomer>{
    return this.http.get(this.apiurl);
  }
  
  getCustomerbyId(id:any): Observable<ICustomer>{
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  deleteCustomerbyId(id:any){
    return this.http.delete<ICustomer>(`${this.apiurl}/${id}`);
  }
  updateCustomer(id:any, customerData:ICustomer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  
}
