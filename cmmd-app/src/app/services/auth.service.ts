import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiurl = 'https://localhost:7252/api/Admin/'
  constructor(private http:HttpClient, private router:Router) { }

  signUp(userObj:any)
  {
    return this.http.post<any>(`${this.apiurl}register`, userObj);
  }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.apiurl}authenticate`, loginObj);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  signOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
