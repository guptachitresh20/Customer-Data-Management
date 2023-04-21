import { AutofillMonitor } from '@angular/cdk/text-field';
import { AfterContentChecked, AfterViewChecked, Component,DoCheck,EventEmitter,OnChanges,OnInit, Output, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCustomerComponent } from '../customer/add-customer/add-customer.component';
import { AddAccountComponent } from '../accounts/add-account/add-account.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CustomerHomeComponent } from '../customer/customer-home/customer-home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private route:Router, private router:ActivatedRoute, private search:SearchService){}
  menuType:String='customer'
  customer_id:string;

  ngOnInit():void{
    this.route.events.subscribe((val:any)=>{
      if(val.url && !val.url.includes('/accounts')){  
        if(val.url && !val.url.includes('/accounts'))console.log(val.url);
        if(val.url && !val.url.includes('/accounts')){
          this.menuType='customer';
          console.warn(this.menuType)
        }
      }
      else{
        if(val.url && val.url.includes('/accounts'))console.log(val.url);
        if(val.url && val.url.includes('/accounts')){this.menuType='accounts';
        console.warn(this.menuType)}
      } 
    });
  }

  addCustomer(){
    this.dialog.open(AddCustomerComponent,{
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        modalTitle:"Add Customer Form",
        button:"Add"
      }
    });
  }

  addAccount(){
    this.dialog.open(AddAccountComponent,{
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data:{
        customer_id:this.customer_id,
        modalTitle:"Add Account Form",
        button:"Add"
      }
    });
  }

  enteredSearch:string="";

  onSearchTextChanged()
  {
    console.log(this.enteredSearch)
    this.search.setSearchValue(this.enteredSearch);
  }
  hideSearch()
  {
    
  }
}