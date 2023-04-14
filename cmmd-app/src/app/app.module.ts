import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatTableModule} from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http'
import {NgToastModule} from 'ng-angular-popup'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';


import { AddCustomerComponent } from './customer/add-customer/add-customer.component';

import { NgConfirmModule } from 'ng-confirm-box';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddCustomerComponent,
    CustomerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    NgToastModule,
    NgConfirmModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
