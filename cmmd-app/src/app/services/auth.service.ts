import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAdmin } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email:string="";
  apiurl = 'https://localhost:7252/api/Admin/'
  constructor(private http:HttpClient, private router:Router) { }

  SignUp(userObj:any)
  {
    return this.http.post<any>(`${this.apiurl}register`, userObj);
  }

  Login(loginObj:any)
  {
    return this.http.post<any>(`${this.apiurl}authenticate`, loginObj);
  }

  Reset(resetObj:any)
  {
    return this.http.put<any>(`${this.apiurl}reset`, resetObj);
  }

  GetAdmin(id:any)
  {
    return this.http.get<IAdmin>(`${this.apiurl}${id}`);
  }

  StoreToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  GetToken()
  {
    return localStorage.getItem('token');
  }

  IsLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  SignOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
