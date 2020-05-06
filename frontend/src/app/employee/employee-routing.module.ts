import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { EmployeeListComponent } from './list-employee/list-employee.component';
import { RolesGuard } from '../service/roles.guard';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateCustomerComponent } from '../customer/create-customer/create-customer.component';
import { ListCustomerComponent } from '../customer/list-customer/list-customer.component';
import { EditCustomerComponent } from '../customer/edit-customer/edit-customer.component';


const routes: Routes = [
  {
    path: 'list-employee',
    component: EmployeeListComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: {roles: ['ROLE_MANAGER']}
  },
  {
    path: 'create-employee',
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: {roles: ['ROLE_MANAGER', 'ROLE_EMPLOYEE']}
  },
  {
    path: 'edit-employee',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-customer',
    component: ListCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-customer',
    component: EditCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,
    RolesGuard]
})

export class EmployeeRoutingModule { }
