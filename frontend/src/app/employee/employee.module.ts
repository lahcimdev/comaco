import { NavigationEmployeeComponent } from './navigation-employee/navigation-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountEmployeeComponent } from './account-employee/account-employee.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserPhotoComponent } from '../components/user-photo/user-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


@NgModule({
  declarations: [
    NavigationEmployeeComponent,
    AccountEmployeeComponent,
    DashboardEmployeeComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UserPhotoComponent,
    EditEmployeeComponent
  ],
  entryComponents: [
    UserPhotoComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  exports: [NavigationEmployeeComponent]
})
export class EmployeeModule { }
