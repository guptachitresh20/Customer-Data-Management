import { Injectable } from '@angular/core';
import { IAccount, IDisplayAccount } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Accounts';

  // to add customer
  addAccount(data:IAccount){
    return this.http.post(this.apiurl, data);
  }
  // to get the list of all the customers
  getAccount(){
    return this.http.get<IDisplayAccount[]>(`https://localhost:7252/api/Customers`);
  }
  // to delete the customer 
  deleteAccountbyId(id:any){
    return this.http.delete<IAccount>(`${this.apiurl}/${id}`);
  }
  // to update the specific customer
  updateAccount(id:any, accountData:IAccount){
    return this.http.put(`${this.apiurl}/${id}`,accountData);
  }

  getAccountbyId(id:any): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.apiurl}/${id}`);
  }

  // accounts
  // call when user click on specific customer row -> to fetch all the data of that specific customer
  getCAccountDetail(id:any){
    return this.http.get<IAccount>(`${this.apiurl}/${id}`);
  }
}
