import { NavigationEmployeeComponent } from './navigation-employee/navigation-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountEmployeeComponent } from './account-employee/account-employee.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavigationEmployeeComponent,
    AccountEmployeeComponent,
    DashboardEmployeeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule
  ],
  exports: [NavigationEmployeeComponent]
})
export class EmployeeModule { }
