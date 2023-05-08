import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { ILogs } from '../data-types';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private logService:LogsService){}

  logList:ILogs[];
  p:number =1;
  itemsPerPage:number = 20;
  totalLogs:number;

  ngOnInit(){
    this.logService.getLogs().subscribe((result)=>{
        if(result){
          this.logList=result;
          this.totalLogs=result.length;
        }
    })
  }
}
