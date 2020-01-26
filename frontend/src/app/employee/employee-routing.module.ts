import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RolesGuard } from '../service/roles.guard';


const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: {roles: ['ROLE_MANAGER']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,
    RolesGuard]
})

export class EmployeeRoutingModule { }