import { Pipe, PipeTransform } from '@angular/core';
import { IDisplayAccount } from './data-types';

@Pipe({
  name: 'accountSearchFilter'
})
export class AccountSearchFilterPipe implements PipeTransform {

  transform(Account:IDisplayAccount[], searchValue:string): IDisplayAccount[] {
    if(!Account|| !searchValue){
     return Account;
    }
    return Account.filter(account=>
     account.accountName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
     account.location.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
     account.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
     account.yearOfEst.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
     );
   
   }

}
