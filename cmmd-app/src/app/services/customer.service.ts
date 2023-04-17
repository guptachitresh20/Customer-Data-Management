import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer, DisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/customer';

<<<<<<< HEAD
  addCustomer(data:ICustomer){
    return this.http.post("http://localhost:3000/customer", data);
=======
  addCustomer(data:Customer){
    return this.http.post(this.apiurl, data);
>>>>>>> child
  }
  getCustomer() : Observable<DisplayCustomer>{
    return this.http.get(this.apiurl);
  }
<<<<<<< HEAD
  getCustomerbyid(id:string){
    return this.http.get(`http://localhost:3000/customer/${id}`);
  }
  updateCustomer(customer:ICustomer){
    return this.http.put<ICustomer>(`http://localhost:3000/customer/${customer.id}`,customer);
  }
=======
  
  getCustomerbyId(id:any): Observable<Customer>{
    return this.http.get<Customer>(`${this.apiurl}/${id}`);
  }

  deleteCustomerbyId(id:any){
    return this.http.delete<Customer>(`${this.apiurl}/${id}`);
  }
  updateCustomer(id:any, customerData:Customer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  
>>>>>>> child
}
