import { NavigationCustomerComponent } from './navigation-customer/navigation-customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NavigationCustomerComponent,
    AccountCustomerComponent,
    DashboardCustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule
  ],
  exports: [NavigationCustomerComponent],
})
export class CustomerModule { }
