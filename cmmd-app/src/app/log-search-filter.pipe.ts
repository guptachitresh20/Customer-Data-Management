import { Pipe, PipeTransform } from '@angular/core';
import { ILogs } from './data-types';

@Pipe({
  name: 'logSearchFilter'
})
export class LogSearchFilterPipe implements PipeTransform {

  transform(Logs:ILogs[], searchValue:string): ILogs[] {
    if(!Logs|| !searchValue){
     return Logs;
    }
    return Logs.filter(logs=>
     logs.adminName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.customerName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.accountName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.sectionModified.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.date.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.time.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || 
     logs.action.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
   }
}
