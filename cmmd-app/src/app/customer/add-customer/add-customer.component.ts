import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

    constructor( ){}

    onSubmit(){
      console.log("hello")
      console.log(this.customerAddForm.value);
    }

    customerAddForm = new FormGroup({
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      logo:new FormControl('',[]),
      typeOfCompany:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      gstin:new FormControl('',[Validators.required,Validators.minLength(15)]),
      headquarter:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
      website:new FormControl('',[]),
      countryCode:new FormControl('',[Validators.required])
    });
   
    get email(){
      return this.customerAddForm.get('email');
    }
    get firstName(){
      return this.customerAddForm.get('firstName');
    }
    get lastName(){
      return this.customerAddForm.get('lastName');
    }
    get gstin(){
      return this.customerAddForm.get('gstin');
    }

    get headquarter(){
      return this.customerAddForm.get('headquarter');
    }
    get countryCode(){
      return this.customerAddForm.get('countryCode');
    }
    get description(){
      return this.customerAddForm.get('description');
    }
    get phoneNo(){
      return this.customerAddForm.get('phoneNo');
    }


}
