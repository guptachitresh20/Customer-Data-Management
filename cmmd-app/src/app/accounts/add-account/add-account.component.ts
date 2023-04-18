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
    accountId: new FormControl('', [Validators.required]),
    accountName: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    yearOfEst: new FormControl('', [Validators.required]),
    manager: new FormControl('', [Validators.required]),
    servicesOffered: new FormControl('', [Validators.required]),
    expenses: new FormControl('', [Validators.required]),
    profit: new FormControl('', [Validators.required]),
    revenue: new FormControl('', [Validators.required]),
    noOfDept: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    noofemp: new FormControl('', [Validators.required]),
    operatingHours: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    id: new FormControl('')
  });

  get email() {
    return this.customerAddForm.get('email');
  }

  get operatingHours() {
    return this.customerAddForm.get('operatingHours');
  }

  get accountName() {
    return this.customerAddForm.get('accountName');
  }
  
  get accountId() {
    return this.customerAddForm.get('accountId');
  }
  
  get branch() {
    return this.customerAddForm.get('branch');
  }
  
  get manager() {
    return this.customerAddForm.get('manager');
  }

  get yearOfEst() {
    return this.customerAddForm.get('yearOfEst');
  }
  
  get servicesOffered() {
    return this.customerAddForm.get('servicesOffered');
  }
  
  get expenses() {
    return this.customerAddForm.get('expenses');
  }

  get profit() {
    return this.customerAddForm.get('profit');
  }

  get revenue() {
    return this.customerAddForm.get('revenue');
  }

  get noOfDept() {
    return this.customerAddForm.get('noOfDept');
  }

  get noOfEmp() {
    return this.customerAddForm.get('noofEmp');
  }

  get phoneNo() {
    return this.customerAddForm.get('phoneNo');
  }

}
