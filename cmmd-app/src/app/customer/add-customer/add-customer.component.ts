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
      this.customerAddForm.controls.headquarter.patchValue(this.coordinates.address);
    }

  }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.customerService.getCustomerbyId(this.data.id).subscribe((response) => {
        if(response)
        {
          this.editdata = response;
          console.log(this.editdata);
          this.customerAddForm.setValue({
            CustomerName: this.editdata.CustomerName,
            logo: this.editdata.Logo,
            typeOfCompany: this.editdata.TypeOfCompany,
            description: this.editdata.Description,
            email: this.editdata.Email,
            gstin: this.editdata.Gstin,
            headquarter: this.editdata.Headquarter,
            phoneNo: this.editdata.PhoneNo,
            website: this.editdata.Website,
            countryCode: this.editdata.CountryCode,
          });
        }
      });
    }
  }

  addCustomer() {
    if (this.customerAddForm.valid && this.data.button === 'Update') {
      const Editid = this.customerAddForm.getRawValue().gstin;
      if (Editid != '' && Editid != null) {
        this.customerService
          .updateCustomer(Editid, this.customerAddForm.getRawValue())
          .subscribe(async (result) => {
            if (result == null) {
              this.closePopup();
              alertify.set('notifier','position', 'top-right');
              alertify.success('Customer Updated Successfully');
              await new Promise((f) => setTimeout(f, 1000));
              // window.location.reload();
              this.customerService.callSecondComponent();
              this.addLog('Update');
            } 
          });
      }

    } else {
      this.customerService.addCustomer(this.customerAddForm.value).subscribe(
        async (result) => {
          if (result) {
            this.closePopup();
            alertify.set('notifier','position', 'top-right');
            alertify.success('Customer Added Successfully');
            await new Promise((f) => setTimeout(f, 1000));
            // window.location.reload();
            this.customerService.callSecondComponent();
            this.addLog('Create');
          }
        },
        (error) => {
          this.closePopup();
          alertify.set('notifier','position', 'top-right');
          alertify.error('Customer with same GSTIN already Exists');
        });
    }
  }

  addLog(action:string)
  {
    this.logs.CustomerName=this.customerAddForm.value.CustomerName;
    this.logs.AdminName=localStorage.getItem('adminName');
    this.logs.AccountName="-";
    this.logs.Action=action;
    this.logs.SectionModified='Customer';
    this.logs.Date=new Date().toString();
    this.logs.Time=new Date().toString();
    this.logService.addLog(this.logs).subscribe((result)=>{
      if(result)
      {
        console.log(result);
      }
    });
  }

  closePopup() {
    this.dialog.closeAll();
  }

  customerAddForm = new FormGroup({
    CustomerName: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    typeOfCompany: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gstin: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(15),
    ]),
    headquarter: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required
    ]),
    website: new FormControl('', []),
    countryCode: new FormControl('')
  });

  get email() {
    return this.customerAddForm.get('email');
  }
  get CustomerName() {
    return this.customerAddForm.get('CustomerName');
  }

  get gstin() {
    return this.customerAddForm.get('gstin');
  }

  get headquarter() {
    return this.customerAddForm.get('headquarter');
  }
  get countryCode() {
    return this.customerAddForm.get('countryCode');
  }
  get description() {
    return this.customerAddForm.get('description');
  }
  get phoneNo() {
    return this.customerAddForm.get('phoneNo');
  }


  openGoogleMap()
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
        this.customerAddForm.controls.headquarter.patchValue(this.coordinates.address);
      }
      console.log(this.coordinates.address);
    }, (error)=>{
      console.log("error found");
    })
  }

  onCountryChange(event){
    this.customerAddForm.controls.countryCode.patchValue(event.dialCode);
  }

}
