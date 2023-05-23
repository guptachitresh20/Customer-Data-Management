import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogs, IPaginatedResults } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Logs';


  // to get the list of all the logs
  GetLogs(startIndex,pageSize){
    return this.http.get<IPaginatedResults<ILogs>>(`${this.apiurl}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }

  AddLog(data:ILogs){
    return this.http.post(this.apiurl, data);
  }

  SearchLogs(data:string){
    return this.http.get<ILogs[]>(`${this.apiurl}$like?search=${data}`);
  }
}
