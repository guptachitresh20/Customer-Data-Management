import { Injectable } from '@angular/core';
import { IAccount, IDisplayAccount } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  
  // to add customer
  addAccount(data:IAccount){
    return this.http.post('http://localhost:3000/accounts', data);
  }
  // to get the list of all the customers
  getAccount(){
    return this.http.get<IDisplayAccount[]>('http://localhost:3000/accounts');
  }
  // to delete the customer 
  deleteAccountbyId(id:any){
    return this.http.delete<IAccount>(`http://localhost:3000/accounts/${id}`);
  }
  // to update the specific customer
  updateAccount(id:any, accountData:IAccount){
    return this.http.put(`http://localhost:3000/accounts/${id}`,accountData);
  }

  getAccountbyId(id:any): Observable<IAccount>{
    return this.http.get<IAccount>(`http://localhost:3000/accounts/${id}`);
  }

  // accounts
  // call when user click on specific customer row -> to fetch all the data of that specific customer
  getCAccountDetail(id:any){
    return this.http.get<IAccount>(`http://localhost:3000/accounts/${id}`);
  }
}
