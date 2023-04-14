import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, DisplayCustomer } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  addCustomer(data:Customer){
    return this.http.post("http://localhost:3000/customer", data);
  }
  getCustomer() : Observable<DisplayCustomer>{
    return this.http.get("http://localhost:3000/customer");
  }
}
