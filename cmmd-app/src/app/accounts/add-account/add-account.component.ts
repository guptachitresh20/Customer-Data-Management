import { Component } from '@angular/core';
import { Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {


  addCustomer(){

  }


  customerAddForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
    logo: new FormControl('', []),
    typeOfCompany: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    noofemp: new FormControl('', [Validators.required]),
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
  
  get noofemp() {
    return this.customerAddForm.get('noofemp');
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
