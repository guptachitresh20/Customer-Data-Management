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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {NgToastModule} from 'ng-angular-popup'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { NgConfirmModule } from 'ng-confirm-box';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { AccountsModule } from './accounts/accounts.module';
import { CustomerModule } from './customer/customer.module';
import { FormsModule } from '@angular/forms';
// import {BreadcrumbModule} from 'angular-crumbs';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component'
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { GoogleMapComponent } from './accounts/google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { LogsComponent } from './logs/logs.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SearchFilterPipe } from './search-filter.pipe';
import { AccountSearchFilterPipe } from './account-search-filter.pipe';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    GoogleMapComponent,
    LoginComponent,
    RegisterComponent,
    LogsComponent,
    // AccountSearchFilterPipe,
    // SearchFilterPipe
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
    MatSortModule,
    AccountsModule,
    CustomerModule,
    AdminModule,
    NgxPaginationModule,
    FormsModule,
    BreadcrumbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzfzsRZ4XEwzxiXnjzTybY6TflZnRTeq4',
      libraries: ['places']
    }),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
