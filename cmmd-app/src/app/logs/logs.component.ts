import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { ILogs } from '../data-types';
import { Location } from '@angular/common';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private location:Location,  public logSearch:SearchService, private logService:LogsService){}

  logList:ILogs[];
  p:number =1;
  itemsPerPage:number = 20;
  totalLogs:number;

  ngOnInit(){
    this.logService.getLogs().subscribe((result)=>{
        if(result){
          this.logList=result;
          this.totalLogs=result.length;
          this.logList=this.logList.reverse();
        }
    })
  }

  backButton()
  {
    this.location.back();
  }

}
