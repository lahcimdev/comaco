import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetBasicEmployeeDtoListAction, GetAllEmployeeTypesAction, UpdateEmployeeAction, GetEmployeeDtoAction, SetEmployeeDtoAction } from 'src/app/state/employee/employee.actions';
import { BasicEmployeeDto, Role, Address, EmployeeDto } from 'src/api/models';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { GetAllRolesAction } from 'src/app/state/user/user.actions';
import { EmployeeState } from 'src/app/state/employee/employee.state';
import { MatDialog } from '@angular/material';
import { UserPhotoComponent } from 'src/app/components/user-photo/user-photo.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  sex = [{
    value: 'MALE',
    translate: 'employee.sexType.male'
  },
  {
    value: 'FEMALE',
    translate: 'employee.sexType.female'
  }]

  errorMessage = {
    employee: null,
    address: null
  }

  private editEmployeeId: number;

  private employeeListForm: FormGroup;
  private employeeForm: FormGroup;
  private addressForm: FormGroup[] = [];

  private employeePhoto: string;

  private addressTabs = [];
  private selectedTab = new FormControl(0);

  private employeeSubscription: Subscription;
  private pathSubscription: Subscription;
  private dialogImage: Subscription;

  @Select(state => state.employee.basicEmployeeDtoList)
  basicEmployeeDtoList$: Observable<Array<BasicEmployeeDto>>;

  @Select(state => state.employee.employeeDto)
  employeeDto$: Observable<EmployeeDto>;

  @Select(state => state.employee.employeeTypes)
  employeeTypes$: Observable<Array<string>>;

  @Select(state => state.user.roles)
  roles$: Observable<Array<Role>>;

  constructor(private store: Store, private acttivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new GetBasicEmployeeDtoListAction());
    this.store.dispatch(new GetAllEmployeeTypesAction());
    this.store.dispatch(new GetAllRolesAction());

    this.employeeListForm = this.formBuilder.group({
      basicEmployeeDto: ['']
    })

    this.employeeForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      employeeType: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: [''],
      sex: [''],
    })

    this.pathSubscription = this.acttivatedRoute.params.subscribe(params => {
      this.editEmployeeId = params['id'];
      if (this.editEmployeeId > 0) {
        this.store.dispatch(new GetEmployeeDtoAction(this.editEmployeeId));
      }

      this.employeeSubscription = this.employeeDto$.subscribe(employee => {
        if (employee) {

          this.employeeListForm.patchValue({
            basicEmployeeDto: employee.id
          })

          this.employeeForm.patchValue({
            username: employee.username,
            employeeType: employee.employeeType,
            roles: employee.roles,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            sex: employee.sex,
            birthDate: employee.birthDate
          });

          if (employee.photo) {
            this.employeePhoto = 'data:image/png;base64,' + employee.photo;
          }

          this.addressTabs = [];
          this.addressForm = [];
          this.selectedTab.setValue(0);

          let mainAddress: Address = employee.address.find(address => {
            return address.addressType === 'MAIN';
          })
          if (mainAddress) {
            this.addressTabs.push(mainAddress.addressType);
            this.addressForm.push(this.formBuilder.group({
              id: [mainAddress.id, [Validators.required]],
              addressType: [mainAddress.addressType, [Validators.required]],
              street: [mainAddress.street, [Validators.required]],
              city: [mainAddress.city, [Validators.required]],
              postalCode: [mainAddress.postalCode, [Validators.required]],
              description: [mainAddress.description],
            }))
          }
          employee.address.forEach(additionalAddress => {
            if (additionalAddress.addressType === 'ADDITIONAL') {
              this.addressTabs.push(additionalAddress.addressType);
              this.addressForm.push(this.formBuilder.group({
                id: [additionalAddress.id, [Validators.required]],
                addressType: [additionalAddress.addressType, [Validators.required]],
                street: [additionalAddress.street, [Validators.required]],
                city: [additionalAddress.city, [Validators.required]],
                postalCode: [additionalAddress.postalCode, [Validators.required]],
                description: [additionalAddress.description],
              }))
            }
          })

        }
      })

    });

  }

  ngOnDestroy(): void {
    this.pathSubscription.unsubscribe();
    this.employeeSubscription.unsubscribe();
    this.store.dispatch(new SetEmployeeDtoAction(null));
    if (this.dialogImage) {
      this.dialogImage.unsubscribe();
    }
  }

  changeEmployee(changeEmployee: any) {
    if (changeEmployee.valueOf() > 0) {
      this.store.dispatch(new Navigate(['edit-employee', changeEmployee.valueOf()]))
    }
  }

  addAddressTab() {
    let addressType: string;
    if (this.addressTabs.length == 0) {
      addressType = 'MAIN';
    } else {
      addressType = 'ADDITIONAL';
    }
    this.addressTabs.push(addressType);
    this.addressForm.push(this.formBuilder.group({
      id: [null],
      addressType: [addressType, [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      description: [''],
    }))
    this.selectedTab.setValue(this.addressTabs.length - 1);
  }

  removeAddressTab(index: number) {
    if (index != 0) {
      this.selectedTab.setValue(index - 1);
      this.addressTabs.splice(index, 1);
      this.addressForm.splice(index, 1);
    } else {
      console.log('Główny adres jest obowiązkowy');
    }
  }

  openPhotoFile(event) {
    const selectedFile = event;

    const dialogReference = this.dialog.open(UserPhotoComponent, {
      width: 'auto',
      height: 'auto',
      data: selectedFile
    });

    this.dialogImage = dialogReference.afterClosed().subscribe(result => {
      this.employeePhoto = result;
    });
  }

  deletePhoto() {
    this.employeePhoto = null;
  }

  compareRoles(role1: Role, role2: Role): boolean {
    return role1 && role2 ? role1.id === role2.id : role1 === role2;
  }

  errorHandlingEmployee(control: string, error: string) {
    return this.employeeForm.controls[control].hasError(error);
  }
  errorHandlingAddress(selectedTab: number, control: string, error: string) {
    return this.addressForm[selectedTab].controls[control].hasError(error);
  }

  updateEmployee() {
    if (this.verifyEditEmployeeForm()) {
      let updatedEmployee: EmployeeDto;
      let baseEmployee = this.store.selectSnapshot(EmployeeState.getEmployeeDto);

      updatedEmployee = {
        id: this.editEmployeeId,
        username: this.employeeForm.get('username').value,
        roles: this.employeeForm.get('roles').value,
        employeeType: this.employeeForm.get('employeeType').value,

        firstName: this.employeeForm.get('firstName').value,
        lastName: this.employeeForm.get('lastName').value,
        email: this.employeeForm.get('email').value,
        phone: this.employeeForm.get('phone').value,
        birthDate: this.employeeForm.get('birthDate').value,
        sex: this.employeeForm.get('sex').value,
        address: [],
        photo: null
      }

      this.addressForm.forEach(address => {
        updatedEmployee.address.push({
          id: address.get('id').value,
          addressType: address.get('addressType').value,
          street: address.get('street').value,
          city: address.get('city').value,
          postalCode: address.get('postalCode').value,
          description: address.get('description').value
        })
      })

      if (!baseEmployee.photo && this.employeePhoto) {
        updatedEmployee.photo = this.employeePhoto.split('base64,')[1];
      }
      if (baseEmployee.photo) {
        if (this.employeePhoto && (baseEmployee.photo != this.employeePhoto.split('base64,')[1])) {
          updatedEmployee.photo = this.employeePhoto.split('base64,')[1];
        }
        if (!this.employeePhoto) {
          updatedEmployee.photo = 'DELETE';
        }
      }

      this.store.dispatch(new UpdateEmployeeAction(updatedEmployee, updatedEmployee.photo));

    }
  }

  verifyEditEmployeeForm() {
    let result: boolean = true;
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.errorMessage.employee = 'create-employee.errorMessages.requiredEmployee';
      result = false;
    } else {
      this.errorMessage.employee = null;
    }
    for (let i = 0; i < this.addressForm.length; i++) {
      if (this.addressForm[i].invalid) {
        this.addressForm[i].markAllAsTouched();
        this.selectedTab.setValue(i);
        this.errorMessage.address = 'create-employee.errorMessages.requiredAddress';
        result = false;
      } else {
        this.errorMessage.address = null;
      }
    }
    return result;
  }


}
