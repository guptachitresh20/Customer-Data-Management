import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component , Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccount, ICustomer, IDisplayAccount, ILogs } from 'src/app/data-types';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AddAccountComponent } from '../add-account/add-account.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';
import { GoogleMapComponent } from 'src/app/accounts/google-map/google-map.component';
import { MapPlottingComponent } from 'src/app/accounts/map-plotting/map-plotting.component';
import { LogsService } from 'src/app/services/logs.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent {

  accountList :  IDisplayAccount[];
  dataSource: any;
  empdata: any;
  totalAccount : any;
  logs: ILogs={};
  account:IAccount;

  p:number =1;
  itemsPerPage:number = 10;
  totalProduct:any;
  customerDetail:ICustomer;
  customer_id:string;

  constructor(private accountService: AccountService,private logService:LogsService, private http:HttpClient, private route: ActivatedRoute, private dialog: MatDialog, private customerService:CustomerService, public search:SearchService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let id=params.get('id');
      if(id)
      {
        this.customer_id=id;
      }
    })
    localStorage.setItem('id',this.customer_id);
    this.getCustomerList();
    this.getList();
  }

  getList(){
    this.accountService.getAccount().subscribe((result)=>{
      if(result){
        this.accountList = result;
        this.totalAccount = result.length;
      }
  
    });
  }

  getCustomerList(){
    this.customerService.getCustomerbyId(this.customer_id).subscribe((result)=>{
      if(result)
      {
        this.customerDetail = result;
      }
    });
  }

  editAccount(id: string) {
    this.dialog.open(AddAccountComponent, {
      maxHeight: 'calc(100vh - 120px)',
      height: 'auto',
      backdropClass: "backgroundblur",
      data: {
        id: id,
        modalTitle: 'Update Account Form',
        button: 'Update'
      }

    });
  }

  getAccountName(id)
  {
    this.accountService.getAccountbyId(id).subscribe((result)=>{
      if(result){
        this.account=result;
      }
    })
  }

  deleteAccount(id: string) {
    console.log(id);
    alertify.confirm("Delete Account", "Do you want to delete this account?", () => {
      this.getAccountName(id);
      this.accountService.deleteAccountbyId(id).subscribe(async result => {
        if(result)
        {
          alertify.error('Deleted Successfully');
          this.getList();
          await new Promise(f => setTimeout(f, 1000));
          window.location.reload();
          this.logs.customerName=this.customerDetail.cname;
          this.logs.adminName=localStorage.getItem('adminName');
          this.logs.accountName=this.account.accountName;
          this.logs.action="Delete";
          this.logs.sectionModified='Account';
          this.logs.date=new Date().toString();
          this.logs.time=new Date().toString();
          this.logService.addLog(this.logs).subscribe((result)=>{
          if(result)
          {
            console.log(result);
          }
        });
        }
      });
    }, function () {

    });

  }


  plotOnMap()
  {
    if(this.customerDetail.accounts.length!==0)
    {
      this.dialog.open(MapPlottingComponent, {
        height: '50vh',
        width:'50vw', 
        backdropClass:"backgroundblur" 
      });
    }
    else{
      alertify.error('No Accounts to Plot');
    }
    // console.log(this.customerDetail?.accounts);
  }
  closeDialog(sendData:any)
  {
    this.dialog.closeAll();
  }


}
