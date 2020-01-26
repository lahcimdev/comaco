import { NavigationEmployeeComponent } from './navigation-employee/navigation-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountEmployeeComponent } from './account-employee/account-employee.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  declarations: [
    NavigationEmployeeComponent,
    AccountEmployeeComponent,
    DashboardEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    RouterModule,
    TranslateModule
  ],
  exports: [NavigationEmployeeComponent]
})
export class EmployeeModule { }
