import { NavigationCustomerComponent } from './navigation-customer/navigation-customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';



@NgModule({
  declarations: [
    NavigationCustomerComponent,
    AccountCustomerComponent,
    DashboardCustomerComponent,
    CreateCustomerComponent,
    ListCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NavigationCustomerComponent],
})
export class CustomerModule { }
