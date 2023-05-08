import { Pipe, PipeTransform } from '@angular/core';
import { IDisplayAccount, IDisplayCustomer } from './data-types';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(Customer:IDisplayCustomer[], searchValue:string): IDisplayCustomer[] {
   if(!Customer|| !searchValue){
    return Customer;
   }
   return Customer.filter(customer=>
    customer.cname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
