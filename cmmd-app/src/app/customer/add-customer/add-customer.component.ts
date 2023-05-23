import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccountsPaginatedResults, IAdmin, ICustomer, ILogs } from 'src/app/data-types';
import { CustomerService } from '../../services/customer.service';
import { CustomerHomeComponent } from '../customer-home/customer-home.component';
import * as alertify from 'alertifyjs';
import { delay } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
import { GoogleMapComponent } from 'src/app/accounts/google-map/google-map.component';
import intlTelInput from 'intl-tel-input';
import countries from '../../countries.json';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

interface Coordinates {
  address?: string;
}


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit{
  formName: string;
  editdata: ICustomer;
  error: boolean = false;
  errorMessage = '';
  logs: ILogs={};
  coordinates: Coordinates;
  disablePlaceholder:boolean=false;

  countryList:{name:string,code:string}[]=countries;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logService: LogsService,
  ) {
    this.coordinates={} as Coordinates;
    if(this.coordinates.address)
    {
      this.CustomerAddForm.controls.Headquarter.patchValue(this.coordinates.address);
    }

  }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.customerService.GetCustomerbyId(this.data.id).subscribe((response) => {
        if(response)
        {
          this.editdata = response;
          this.CustomerAddForm.setValue({
            CustomerName: this.editdata.CustomerName,
            Logo: this.editdata.Logo,
            TypeOfCompany: this.editdata.TypeOfCompany,
            Description: this.editdata.Description,
            Email: this.editdata.Email,
            Gstin: this.editdata.Gstin,
            Headquarter: this.editdata.Headquarter,
            PhoneNo: this.editdata.PhoneNo,
            Website: this.editdata.Website,
            CountryCode: this.editdata.CountryCode,
          });
        }
      });
    }
  }

  AddCustomer() {
    if (this.CustomerAddForm.valid && this.data.button === 'Update') {
      const Editid = this.CustomerAddForm.getRawValue().Gstin;
      if (Editid != '' && Editid != null) {
        this.customerService
          .UpdateCustomer(Editid, this.CustomerAddForm.getRawValue())
          .subscribe(async (result) => {
            if (result == null) {
              this.ClosePopup();
              alertify.set('notifier','position', 'top-right');
              alertify.success('Customer Updated Successfully');
              await new Promise((f) => setTimeout(f, 1000));
              // window.location.reload();
              this.customerService.CallSecondComponent();
              this.AddLog('Update');
            } 
          });
      }

    } else {
      this.customerService.AddCustomer(this.CustomerAddForm.value).subscribe(
        async (result) => {
          if (result) {
            this.ClosePopup();
            alertify.set('notifier','position', 'top-right');
            alertify.success('Customer Added Successfully');
            await new Promise((f) => setTimeout(f, 1000));
            // window.location.reload();
            this.customerService.CallSecondComponent();
            this.AddLog('Create');
          }
        },
        (error) => {
          this.ClosePopup();
          alertify.set('notifier','position', 'top-right');
          alertify.error('Customer with same GSTIN already Exists');
        });
    }
  }

  AddLog(action:string)
  {
    this.logs.CustomerName=this.CustomerAddForm.value.CustomerName;
    this.logs.AdminName=localStorage.getItem('adminName');
    this.logs.AccountName="-";
    this.logs.Action=action;
    this.logs.SectionModified='Customer';
    this.logs.Date=new Date().toString();
    this.logs.Time=new Date().toString();
    this.logService.AddLog(this.logs).subscribe((result)=>{
    });
  }

  ClosePopup() {
    this.dialog.closeAll();
  }

  CustomerAddForm = new FormGroup({
    CustomerName: new FormControl('', [Validators.required]),
    Logo: new FormControl('', [Validators.required]),
    TypeOfCompany: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Gstin: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(15),
    ]),
    Headquarter: new FormControl('', [Validators.required]),
    PhoneNo: new FormControl('', [
      Validators.required
    ]),
    Website: new FormControl('', []),
    CountryCode: new FormControl('')
  });

  get Email() {
    return this.CustomerAddForm.get('Email');
  }
  get CustomerName() {
    return this.CustomerAddForm.get('CustomerName');
  }

  get Gstin() {
    return this.CustomerAddForm.get('Gstin');
  }

  get Headquarter() {
    return this.CustomerAddForm.get('Headquarter');
  }
  get CountryCode() {
    return this.CustomerAddForm.get('CountryCode');
  }
  get Description() {
    return this.CustomerAddForm.get('Description');
  }
  get PhoneNo() {
    return this.CustomerAddForm.get('PhoneNo');
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
        this.CustomerAddForm.controls.Headquarter.patchValue(this.coordinates.address);
      }
    }, (error)=>{
    })
  }

  OnCountryChange(event){
    this.CustomerAddForm.controls.CountryCode.patchValue(event.dialCode);
  }

}
