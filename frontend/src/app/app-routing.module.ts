import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountEmployeeComponent } from './employee/account-employee/account-employee.component';
import { AccountCustomerComponent } from './customer/account-customer/account-customer.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { DashboardEmployeeComponent } from './employee/dashboard-employee/dashboard-employee.component';
import { DashboardCustomerComponent } from './customer/dashboard-customer/dashboard-customer.component';
import { AuthorizationErrorComponent } from './main/errors/authorization-error/authorization-error.component';
import { ServerErrorComponent } from './main/errors/server-error/server-error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account-employee',
    component: AccountEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-customer',
    component: AccountCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-employee',
    component: DashboardEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-customer',
    component: DashboardCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'authorization-error',
    component: AuthorizationErrorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
