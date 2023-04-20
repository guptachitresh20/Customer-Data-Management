import { Component } from '@angular/core';
import { Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import * as alertify from 'alertifyjs';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  constructor(private dialog: MatDialog, private account:AccountService,@Inject(MAT_DIALOG_DATA) public data: any){}

  editdata: any;
  randomAccountId:string=this.generateRandomInteger(1, 1000) as unknown as string;
  
  

  ngOnInit(): void {
    console.log(this.randomAccountId);
    if (this.data.id != '' && this.data.id != null) {
      this.account.getAccountbyId(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log(this.data)
        this.accountAddForm.setValue({
          accountId:this.editdata.accountId,
          accountName: this.editdata.accountName,
          branch: this.editdata.branch,
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
          id: this.editdata.id
        })
      })
    }
  }


  addAccount() {
    if (this.accountAddForm.valid) {
      const Editid = this.accountAddForm.getRawValue().accountId;
      if (Editid != '' && Editid != null) {
        this.account.updateAccount(Editid, this.accountAddForm.getRawValue()).subscribe(async (result) => {
          if (result) {
            this.closePopup();
            alertify.success("Updated Successfully");
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
          }
        });
      }
    }
    this.account.addAccount(this.accountAddForm.value).subscribe(async (result) => {
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

  generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  accountAddForm = new FormGroup({
    accountId: new FormControl(this.randomAccountId, [Validators.required]),
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
    noOfEmp: new FormControl('', [Validators.required]),
    operatingHours: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    id: new FormControl('')
  });

  get accountId() {
    return this.accountAddForm.get('accountId');
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
  
  get branch() {
    return this.accountAddForm.get('branch');
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



}
