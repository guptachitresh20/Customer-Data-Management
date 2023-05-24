import { Injectable } from '@angular/core';
import { IAccount, IDisplayAccount } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Accounts';

  invokeEvent: Subject<any> = new Subject(); 
  // to add account
  AddAccount(data:IAccount){
    return this.http.post(this.apiurl, data);
  }
  // to delete the account 
  DeleteAccountbyId(id:any){
    return this.http.delete<IAccount>(`${this.apiurl}/${id}`);
  }
  // to update the specific account
  UpdateAccount(id:any, accountData:IAccount){
    return this.http.put(`${this.apiurl}/${id}`,accountData);
  }

  GetAccountbyId(id:any): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.apiurl}/${id}`);
  }

  SearchAccounts(data:string, id:string){
    return this.http.get<IDisplayAccount[]>(`${this.apiurl}$like?search=${data}&id=${id}`);
  }

  CallSecondComponent() { 
    this.invokeEvent.next("getList");   
  }
}
