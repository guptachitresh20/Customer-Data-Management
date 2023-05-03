import { Component } from '@angular/core';
import { Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import * as alertify from 'alertifyjs';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapComponent } from 'src/app/accounts/google-map/google-map.component';
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

  constructor(private dialog: MatDialog, private account:AccountService,@Inject(MAT_DIALOG_DATA) public data: any, private route:ActivatedRoute){
    this.coordinates={} as Coordinates;
    if(this.coordinates.address)
    {
      this.accountAddForm.controls.location.patchValue(this.coordinates.address);
      this.accountAddForm.controls.latitude.patchValue(this.coordinates.latitude);
      this.accountAddForm.controls.longitude.patchValue(this.coordinates.longitude);
    }
  }

  editdata: any;
  randomAccountId:string=this.generateRandomInteger(1, 1000).toString();
  customer_id:string=this.data.customer_id;


  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.account.getAccountbyId(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log(this.editdata);
        this.accountAddForm.setValue({
          accountId:this.editdata.accountId,
          accountName: this.editdata.accountName,
          gstin: this.editdata.gstin,
          location: this.editdata.location,
          yearOfEst: this.editdata.yearOfEst,
          manager: this.editdata.manager,
          email: this.editdata.email,
          servicesOffered: this.editdata.servicesOffered,
          expenses: this.editdata.expenses,
          profit: this.editdata.profit,
          revenue: this.editdata.revenue,
          noOfDept: this.editdata.noOfDept,
          noOfEmp: this.editdata.noOfEmp,
          phoneNo: this.editdata.phoneNo,
          operatingHours: this.editdata.operatingHours,
          longitude: this.editdata.longitude,
          latitude: this.editdata.latitude
        })
      })
    }
  }


  addAccount() {
    // console.log(this.accountAddForm.value)
    if (this.accountAddForm.valid && this.data.button=='Update') {
      const Editid = this.accountAddForm.getRawValue().email;
      if (Editid != '' && Editid != null) {
        this.account.updateAccount(Editid, this.accountAddForm.getRawValue()).subscribe(async (result) => {
          if (result==null) {
            this.closePopup();
            alertify.success("Updated Successfully");
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
          }
        });
      }
    }
    else{
      this.accountAddForm.value.yearOfEst=this.accountAddForm.value.yearOfEst.toString();
      this.accountAddForm.value.noOfEmp=this.accountAddForm.value.noOfEmp.toString();
      this.accountAddForm.value.noOfDept=this.accountAddForm.value.noOfDept.toString();
      this.accountAddForm.value.operatingHours=this.accountAddForm.value.operatingHours.toString();
      this.accountAddForm.value.profit=this.accountAddForm.value.profit.toString();
      this.accountAddForm.value.expenses=this.accountAddForm.value.expenses.toString();
      this.accountAddForm.value.revenue=this.accountAddForm.value.revenue.toString();
      this.accountAddForm.value.phoneNo=this.accountAddForm.value.phoneNo.toString();
      this.accountAddForm.value.longitude=this.coordinates.longitude;
      this.accountAddForm.value.latitude=this.coordinates.latitude;
      console.log(this.accountAddForm.value);
      this.account.addAccount(this.accountAddForm.value).subscribe(async (result) => {
      console.log(result);
      if (result) {
        this.closePopup();
        alertify.success("Added Successfully");
        await new Promise(f => setTimeout(f, 1000));
        window.location.reload();
        }
      },
      (error) => 
      {
        this.closePopup();
        alertify.error("Account with same email id already Exists");
      });
    }
  }

  closePopup() {
    this.dialog.closeAll();
  }

  generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  accountAddForm = new FormGroup({
    accountId: new FormControl(this.randomAccountId.toString()),
    accountName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    yearOfEst: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    manager: new FormControl('', [Validators.required]),
    servicesOffered: new FormControl('', [Validators.required]),
    expenses: new FormControl('', [Validators.required]),
    profit: new FormControl('', [Validators.required]),
    revenue: new FormControl('', [Validators.required]),
    noOfDept: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    noOfEmp: new FormControl('', [Validators.required]),
    operatingHours: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    gstin: new FormControl(localStorage.getItem('id')),
    longitude: new FormControl(),
    latitude: new FormControl()
  });

  get accountId() {
    return this.accountAddForm.get('accountId');
  }

  get gstin() {
    return this.accountAddForm.get('gstin');
  }

  get email() {
    return this.accountAddForm.get('email');
  }

  get operatingHours() {
    return this.accountAddForm.get('operatingHours');
  }

  get accountName() {
    return this.accountAddForm.get('accountName');
  }
  
  get location() {
    return this.accountAddForm.get('location');
  }
  
  get manager() {
    return this.accountAddForm.get('manager');
  }

  get yearOfEst() {
    return this.accountAddForm.get('yearOfEst');
  }
  
  get servicesOffered() {
    return this.accountAddForm.get('servicesOffered');
  }
  
  get expenses() {
    return this.accountAddForm.get('expenses');
  }

  get profit() {
    return this.accountAddForm.get('profit');
  }

  get revenue() {
    return this.accountAddForm.get('revenue');
  }

  get noOfDept() {
    return this.accountAddForm.get('noOfDept');
  }

  get noOfEmp() {
    return this.accountAddForm.get('noOfEmp');
  }

  get phoneNo() {
    return this.accountAddForm.get('phoneNo');
  }




  openGoogleMap()
  {
    let dialogRef=this.dialog.open(GoogleMapComponent,{
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
        this.accountAddForm.controls.location.patchValue(this.coordinates.address);
        this.accountAddForm.controls.latitude.patchValue(this.coordinates.latitude);
        this.accountAddForm.controls.longitude.patchValue(this.coordinates.longitude);
      }
      console.log(this.coordinates.address);
    }, (error)=>{
      console.log("error found");
    })
  }

}
