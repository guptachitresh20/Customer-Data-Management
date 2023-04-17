import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ICustomer } from 'src/app/data-types';
import {CustomerService} from '../../services/customer.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  constructor(private customer:CustomerService , private route:ActivatedRoute, private router:Router,@Inject(MAT_DIALOG_DATA) public data:any, private dialog:MatDialog){}
  customerData:undefined|ICustomer;
  updateCustomerMessage:string|undefined;
  ngOnInit():void{
    // let customerId=this.route.snapshot.paramMap.get('id');
    if(this.data.id!='' && this.data.id!=null){
        this.customer.getCustomerbyid(this.data.id).subscribe((data)=>
        {
            this.customerData=data;
            this.customerUpdateForm.setValue({cname:this.customerData.cname,
            logo:this.customerData.logo,
            typeOfCompany:this.customerData.typeOfCompany,
            description:this.customerData.description,
            email:this.customerData.email,
            gstin:this.customerData.gstin,
            headquarter:this.customerData.headquarter,
            phoneNo:this.customerData.phoneNo,
            website:this.customerData.website,
            countryCode:this.customerData.countryCode,
          })
        })
    }
  }
  
  updateCustomer(customerdata:ICustomer){
    if(this.customerData){
      customerdata.id=this.customerData.id;
    }
    this.customer.updateCustomer(customerdata).subscribe((result)=>{
      console.log(result);
      if(result){
        this.updateCustomerMessage="Product is successfully added";
        // setTimeout(()=>
        // {
        //   this.updateCustomerMessage = undefined
        // },3000);
      }
    });
    setTimeout(()=>{
      // this.productMessage=undefined;
      // this.router.navigate(['']);
      this.dialog.closeAll();
    },300)
    console.log(customerdata)
    this.router.navigate(['']);
  }

  customerUpdateForm = new FormGroup({
    cname:new FormControl('',[Validators.required]),
    logo:new FormControl('',[]),
    typeOfCompany:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email],),
    gstin:new FormControl('',[Validators.required,Validators.minLength(15)]),
    headquarter:new FormControl('',[Validators.required]),
    phoneNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
    website:new FormControl('',[]),
    countryCode:new FormControl('',[Validators.required])
  });
 
  get email(){
    return this.customerUpdateForm.get('email');
  }
  get cname(){
    return this.customerUpdateForm.get('cname');
  }

  get gstin(){
    return this.customerUpdateForm.get('gstin');
  }

  get headquarter(){
    return this.customerUpdateForm.get('headquarter');
  }
  get countryCode(){
    return this.customerUpdateForm.get('countryCode');
  }
  get description(){
    return this.customerUpdateForm.get('description');
  }
  get phoneNo(){
    return this.customerUpdateForm.get('phoneNo');
  }

}
