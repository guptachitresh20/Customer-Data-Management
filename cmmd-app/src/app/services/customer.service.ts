import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  addCustomer(data:Customer){
    return this.http.post("http://localhost:3000/customer", data);
  }
}
