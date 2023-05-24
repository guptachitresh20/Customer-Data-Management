import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { ILogs, IPaginatedResults } from '../data-types';
import { Location } from '@angular/common';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private searchService:SearchService, private location:Location,  public logSearch:SearchService, private logService:LogsService){
    this.searchService.invokeEvent.subscribe(value => {
      if(value){
       this.SearchLogs(value); 
     }
     else{
      this.GetLogs();
     }
    });
  }

  logList:ILogs[];
  pageNumber:number =1;
  pageSize:number = 20;
  totalLogs:number;

  ngOnInit(){
    this.GetLogs();
  }

  GetLogs()
  {
    this.logService.GetLogs((this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IPaginatedResults<ILogs>)=>{
      if(result){
        this.logList=result.Items;
        this.totalLogs=result.TotalCount;
      }
    });
  }

  BackButton()
  {
    this.location.back();
  }

  OnPageChange(event:number){
    this.pageNumber=event;
    this.GetLogs();
  }

  SearchLogs(value)
  {
    this.logService.SearchLogs(value).subscribe((result)=>{
        if(result)
        {
          this.logList=result;
        }
    });
  }
}
