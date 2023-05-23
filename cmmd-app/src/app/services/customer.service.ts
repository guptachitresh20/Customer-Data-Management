import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccountsPaginatedResults, ICustomer, IDisplayAccount, IDisplayCustomer, IPaginatedResults } from '../data-types';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer_gstin:string;

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Customers';

  invokeEvent: Subject<any> = new Subject(); 
  // to add customer 
  AddCustomer(data:ICustomer){
    return this.http.post(this.apiurl, data);
  }
  // to get the list of all the customers
  GetCustomer(startIndex,pageSize){
    return this.http.get<IPaginatedResults<IDisplayCustomer[]>>(`${this.apiurl}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }
  // to delete the customer 
  DeleteCustomerbyId(id:any){
    return this.http.delete<ICustomer>(`${this.apiurl}/${id}`);
  }
  // to update the specific customer
  UpdateCustomer(id:any, customerData:ICustomer){
    return this.http.put(`${this.apiurl}/${id}`,customerData);
  }
  GetCustomerbyId(id:any): Observable<ICustomer>{
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  GetPagedCustomerbyId(id:any,startIndex,pageSize): Observable<IAccountsPaginatedResults>{
    return this.http.get<IAccountsPaginatedResults>(`${this.apiurl}/fetch/${id}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }

  // call when user click on specific customer row -> to fetch all the data of that specific customer
  GetCustomerDetail(id:any){
    return this.http.get<ICustomer>(`${this.apiurl}/${id}`);
  }

  SearchCustomers(data:string){
    return this.http.get<IDisplayCustomer[]>(`${this.apiurl}$like?search=${data}`);
  }

  CallSecondComponent() { 
    this.invokeEvent.next("getList");   
  }
  
}
