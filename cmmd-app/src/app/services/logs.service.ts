import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogs } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/logs';


  // to get the list of all the logs
  getLogs(){
    return this.http.get<ILogs[]>(this.apiurl);
  }

  addLog(data:ILogs){
    return this.http.post(this.apiurl, data);
  }
}
