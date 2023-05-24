import { Component } from '@angular/core';
import { Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import * as alertify from 'alertifyjs';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapComponent } from 'src/app/accounts/google-map/google-map.component';
import { IAccountsPaginatedResults, ICustomer, ILogs, IPaginatedResults } from 'src/app/data-types';
import { LogsService } from 'src/app/services/logs.service';
import { CustomerService } from 'src/app/services/customer.service';
interface Coordinates {
  address?: string;
  latitude?: number;
  longitude?: number;
}



@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  coordinates: Coordinates;
  logs: ILogs={};
  customer:ICustomer;

  constructor(private dialog: MatDialog,private customerService:CustomerService, private logService:LogsService, private accountService:AccountService,@Inject(MAT_DIALOG_DATA) public data: any, private route:ActivatedRoute){
    this.coordinates={} as Coordinates;
    if(this.coordinates.address)
    {
      this.AccountAddForm.controls.Location.patchValue(this.coordinates.address);
      this.AccountAddForm.controls.Latitude.patchValue(this.coordinates.latitude);
      this.AccountAddForm.controls.Longitude.patchValue(this.coordinates.longitude);
    }
  }

  editdata: any;
  randomAccountId:string=this.GenerateRandomInteger(1, 1000).toString();
  customer_id:string=this.data.customer_id;


  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.accountService.GetAccountbyId(this.data.id).subscribe(response => {
        this.editdata = response;
        this.AccountAddForm.setValue({
          AccountId:this.editdata.AccountId,
          AccountName: this.editdata.AccountName,
          Gstin: this.editdata.Gstin,
          Location: this.editdata.Location,
          YearOfEst: this.editdata.YearOfEst,
          Manager: this.editdata.Manager,
          Email: this.editdata.Email,
          ServicesOffered: this.editdata.ServicesOffered,
          Expenses: this.editdata.Expenses,
          Profit: this.editdata.Profit,
          Revenue: this.editdata.Revenue,
          NoOfDept: this.editdata.NoOfDept,
          NoOfEmp: this.editdata.NoOfEmp,
          PhoneNo: this.editdata.PhoneNo,
          OperatingHours: this.editdata.OperatingHours,
          Longitude: this.editdata.Longitude,
          Latitude: this.editdata.Latitude
        })
      })
    }
  }


  GetCustomerName(){
    this.customerService.GetCustomerbyId(localStorage.getItem('id')).subscribe((result:ICustomer)=>{
      if(result){
        this.customer=result;
      }
    })
  }

  AddAccount() {
    if (this.AccountAddForm.valid && this.data.button=='Update') {
      const Editid = this.AccountAddForm.getRawValue().Email;
      if (Editid != '' && Editid != null) {
        this.accountService.UpdateAccount(Editid, this.AccountAddForm.getRawValue()).subscribe(async (result) => {
          if (result==null) {
            this.GetCustomerName();
            this.ClosePopup();
            alertify.set('notifier','position', 'top-right');
            alertify.success("Account Updated Successfully");
            await new Promise(f => setTimeout(f, 1000));
            this.accountService.CallSecondComponent();
            this.AddLog('Update');
          }
        });
      }
    }
    else{
      this.AssignStringValues();
      this.accountService.AddAccount(this.AccountAddForm.value).subscribe(async (result) => {
      if (result) {
        this.GetCustomerName();
        this.ClosePopup();
        alertify.set('notifier','position', 'top-right');
        alertify.success("Account Added Successfully");
        await new Promise(f => setTimeout(f, 1000));
        this.accountService.CallSecondComponent();
        this.AddLog('Create');
        }
      },
      (error) => 
      {
        this.ClosePopup();
        alertify.set('notifier','position', 'top-right');
        alertify.error("Account with same email id already Exists");
      });
    }
  }

  AssignStringValues()
  {
    this.AccountAddForm.value.YearOfEst=this.AccountAddForm.value.YearOfEst.toString();
    this.AccountAddForm.value.NoOfEmp=this.AccountAddForm.value.NoOfEmp.toString();
    this.AccountAddForm.value.NoOfDept=this.AccountAddForm.value.NoOfDept.toString();
    this.AccountAddForm.value.OperatingHours=this.AccountAddForm.value.OperatingHours.toString();
    this.AccountAddForm.value.Profit=this.AccountAddForm.value.Profit.toString();
    this.AccountAddForm.value.Expenses=this.AccountAddForm.value.Expenses.toString();
    this.AccountAddForm.value.Revenue=this.AccountAddForm.value.Revenue.toString();
    this.AccountAddForm.value.PhoneNo=this.AccountAddForm.value.PhoneNo.toString();
    this.AccountAddForm.value.Longitude=this.coordinates.longitude;
    this.AccountAddForm.value.Latitude=this.coordinates.latitude;
  }

  ClosePopup() {
    this.dialog.closeAll();
  }

  GenerateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  AddLog(action:string){
    this.logs.CustomerName  = this.customer.CustomerName;
    this.logs.AdminName=localStorage.getItem('adminName');
    this.logs.AccountName=this.AccountAddForm.getRawValue().AccountName;
    this.logs.Action = action;
    this.logs.SectionModified = 'Account';
    this.logs.Date = new Date().toString();
    this.logs.Time = new Date().toString();
    this.logService.AddLog(this.logs).subscribe((result) => {
    });
  }

  AccountAddForm = new FormGroup({
    AccountId: new FormControl(this.randomAccountId.toString()),
    AccountName: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
    YearOfEst: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    Manager: new FormControl('', [Validators.required]),
    ServicesOffered: new FormControl('', [Validators.required]),
    Expenses: new FormControl('', [Validators.required]),
    Profit: new FormControl('', [Validators.required]),
    Revenue: new FormControl('', [Validators.required]),
    NoOfDept: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    NoOfEmp: new FormControl('', [Validators.required]),
    OperatingHours: new FormControl('', [Validators.required]),
    PhoneNo: new FormControl('', [Validators.required]),
    Gstin: new FormControl(localStorage.getItem('id')),
    Longitude: new FormControl(),
    Latitude: new FormControl()
  });

  get AccountId() {
    return this.AccountAddForm.get('AccountId');
  }

  get Gstin() {
    return this.AccountAddForm.get('Gstin');
  }

  get Email() {
    return this.AccountAddForm.get('Email');
  }

  get OperatingHours() {
    return this.AccountAddForm.get('OperatingHours');
  }

  get AccountName() {
    return this.AccountAddForm.get('AccountName');
  }
  
  get Location() {
    return this.AccountAddForm.get('Location');
  }
  
  get Manager() {
    return this.AccountAddForm.get('Manager');
  }

  get YearOfEst() {
    return this.AccountAddForm.get('YearOfEst');
  }
  
  get ServicesOffered() {
    return this.AccountAddForm.get('ServicesOffered');
  }
  
  get Expenses() {
    return this.AccountAddForm.get('Expenses');
  }

  get Profit() {
    return this.AccountAddForm.get('Profit');
  }

  get rRevenue() {
    return this.AccountAddForm.get('Revenue');
  }

  get NoOfDept() {
    return this.AccountAddForm.get('NoOfDept');
  }

  get NoOfEmp() {
    return this.AccountAddForm.get('NoOfEmp');
  }

  get PhoneNo() {
    return this.AccountAddForm.get('PhoneNo');
  }




  OpenGoogleMap()
  {
    let dialogRef=this.dialog.open(GoogleMapComponent,{
      disableClose:true,
      data: {
        address: 'Some Data',
        latitude: 'From Parent Component',
        longitude: 'This Can be anything'
      },
      height: '80vh',
      width: '40vw',
      panelClass:"dialog-responsive"
    });
    dialogRef.afterClosed().subscribe((result)=>{
      this.coordinates=result;
      if(this.coordinates.address)
      {
        this.AccountAddForm.controls.Location.patchValue(this.coordinates.address);
        this.AccountAddForm.controls.Latitude.patchValue(this.coordinates.latitude);
        this.AccountAddForm.controls.Longitude.patchValue(this.coordinates.longitude);
      }
    }, (error)=>{
    })
  }

}
