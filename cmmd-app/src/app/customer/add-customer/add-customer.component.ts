<<<<<<< HEAD
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ICustomer } from 'src/app/data-types';
import {CustomerService} from '../../services/customer.service'
=======
import { identifierName } from '@angular/compiler';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/data-types';
import { CustomerService } from '../../services/customer.service'
import { CustomerHomeComponent } from '../customer-home/customer-home.component';
import * as alertify from 'alertifyjs';
import { delay } from 'rxjs';
>>>>>>> child

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  formName: string;
  editdata: any;
  constructor(private customer: CustomerService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.customer.getCustomerbyId(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log(this.data)
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
          id: this.editdata.id
        })
      })
    }
  }
  addCustomer() {
    if (this.customerAddForm.valid) {
      const Editid = this.customerAddForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.customer.updateCustomer(Editid, this.customerAddForm.getRawValue()).subscribe(async (result) => {
          if (result) {
            this.closePopup();
            alertify.success("Updated Successfully");
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
          }
        });
      }
    }
    this.customer.addCustomer(this.customerAddForm.value).subscribe(async (result) => {
      if (result) {
        this.closePopup();
        alertify.success("Added Successfully");
        await new Promise(f => setTimeout(f, 1000));
        window.location.reload();

      }
    });
  }

  closePopup() {
    this.dialog.closeAll();
  }

  customerAddForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    typeOfCompany: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gstin: new FormControl('', [Validators.required, Validators.minLength(15)]),
    headquarter: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    website: new FormControl('', []),
    countryCode: new FormControl('', [Validators.required]),
    id: new FormControl('')
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
