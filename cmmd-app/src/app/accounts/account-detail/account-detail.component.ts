import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/data-types';
import { AccountService } from 'src/app/services/account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  Account_id: string;

  accountDetails: IAccount;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  menuType: string;

  ngOnInit() {

      this.route.paramMap.subscribe((res) => {
        let id = res.get('accountid');

        if (id) {
          this.Account_id = id;
        }
      });

      this.GetAccountbyid(this.Account_id);
  }

  GetAccountbyid(account_id: string) {
    this.accountService.GetAccountbyId(account_id).subscribe(async (result) => {
      if (result) {
        this.accountDetails = await result;
      }
    });
  }

  BackButton()
  {
    this.location.back();
  }

}
