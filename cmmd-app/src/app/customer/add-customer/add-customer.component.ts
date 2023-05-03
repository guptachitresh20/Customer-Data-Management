import { identifierName } from '@angular/compiler';
import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomer, ILogs } from 'src/app/data-types';
import { CustomerService } from '../../services/customer.service';
import { CustomerHomeComponent } from '../customer-home/customer-home.component';
import * as alertify from 'alertifyjs';
import { delay } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  formName: string;
  editdata: any;
  error: boolean = false;
  errorMessage = '';
  logs: ILogs={};
  constructor(
    private customer: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logService: LogsService
  ) {}

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.customer.getCustomerbyId(this.data.id).subscribe((response) => {
        this.editdata = response;
        console.log(this.data);
        this.customerAddForm.setValue({
          cname: this.editdata.cname,
          logo: this.editdata.logo,
          typeOfCompany: this.editdata.typeOfCompany,
          description: this.editdata.description,
          email: this.editdata.email,
          gstin: this.editdata.gstin,
          headquarter: this.editdata.headquarter,
          phoneNo: this.editdata.phoneNo,
          website: this.editdata.website,
          countryCode: this.editdata.countryCode,
        });
      });
    }
  }
  addCustomer() {
    if (this.customerAddForm.valid && this.data.button === 'Update') {
      const Editid = this.customerAddForm.getRawValue().gstin;

      if (Editid != '' && Editid != null) {
        this.customer
          .updateCustomer(Editid, this.customerAddForm.getRawValue())
          .subscribe(async (result) => {
            if (result == null) {
              this.closePopup();
              alertify.success('Updated Successfully');
              await new Promise((f) => setTimeout(f, 1000));
              window.location.reload();
              // this.logs.customerName  = this.customerAddForm.getRawValue().cname;
              // this.logs.action = this.data.button;
              // this.logs.sectionModified = 'customer';
              // this.logs.date = new Date().toString();
              // this.logs.time = new Date().toString();
              // this.logService.addLog(this.logs).subscribe((result) => {
              //   if (result) {
              //     console.log(result);
              //   }
              // });
            } 
          });
      }
    } else {
      this.customer.addCustomer(this.customerAddForm.value).subscribe(
        async (result) => {
          if (result) {
            this.closePopup();
            alertify.success('Added Successfully');
            await new Promise((f) => setTimeout(f, 1000));
            window.location.reload();
          }
          // this.logs.customerName=this.customerAddForm.value.cname;
          // this.logs.action=this.data.button;
          // this.logs.sectionModified='customer';
          // this.logs.date=new Date().toString();
          // this.logs.time=new Date().toString();
          // this.logService.addLog(this.logs).subscribe((result)=>{
          //   if(result)
          //   {

          //   }
          // });
        },
        (error) => {
          this.closePopup();
          alertify.error('Customer with same GSTIN already Exists');
        }
      );
    }
  }

  closePopup() {
    this.dialog.closeAll();
  }

  customerAddForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
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
      Validators.required,
      Validators.minLength(10),
    ]),
    website: new FormControl('', []),
    countryCode: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.customerAddForm.get('email');
  }
  get cname() {
    return this.customerAddForm.get('cname');
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
}
