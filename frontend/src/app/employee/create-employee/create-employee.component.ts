import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Role, Address } from 'src/api/models';
import { Store, Select } from '@ngxs/store';
import { GetAllRolesAction } from 'src/app/state/user/user.actions';
import { Observable, Subscription } from 'rxjs';
import { GetAllEmployeeTypesAction, CreateEmployeeAction } from 'src/app/state/employee/employee.actions';
import { UserPhotoComponent } from 'src/app/components/user-photo/user-photo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  addressType = [{
    value: 'MAIN',
    translate: 'employee.addressType.main'
  },
  {
    value: 'ADDITIONAL',
    translate: 'employee.addressType.additional'
  }]

  sex = [{
    value: 'MALE',
    translate: 'employee.sexType.male'
  },
  {
    value: 'FEMALE',
    translate: 'employee.sexType.female'
  }]

  employeeForm: FormGroup;
  addressForm: FormGroup[] = [];

  addressTabs = ['MAIN'];
  selectedTab = new FormControl(0);

  errorMessage = {
    employee: null,
    address: null
  }

  finalImage: string = null;
  dialogImage: Subscription;

  @Select(state => state.user.roles)
  roles$: Observable<Array<Role>>;

  @Select(state => state.employee.employeeTypes)
  employeeTypes$: Observable<Array<string>>;

  constructor(private formBuilder: FormBuilder, private store: Store, private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new GetAllRolesAction());
    this.store.dispatch(new GetAllEmployeeTypesAction());

    this.employeeForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      employeeType: ['', [Validators.required]],
      roles: ['', [Validators.required]],

      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: [null],
      sex: [null],
    })

    this.addressForm.push(this.formBuilder.group({
      addressType: ['MAIN', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      description: [null],
    }))
  }

  ngOnDestroy(): void {
    if (this.dialogImage) {
      this.dialogImage.unsubscribe();
    }

  }

  addAddressTab() {
    this.addressTabs.push('ADDITIONAL');
    this.addressForm.push(this.formBuilder.group({
      addressType: ['ADDITIONAL', [Validators.required]],
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

  errorHandlingEmployee(control: string, error: string) {
    return this.employeeForm.controls[control].hasError(error);
  }
  errorHandlingAddress(selectedTab: number, control: string, error: string) {
    return this.addressForm[selectedTab].controls[control].hasError(error);
  }


  verifyCreateForm(): boolean {
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
        this.errorMessage.address = 'create-employee.errorMessages.requiredAddress';
        result = false;
      } else {
        this.errorMessage.address = null;
      }
    }
    return result;
  }

  createAddressList(): Array<Address> {
    let addressList: Array<Address> = [];
    this.addressForm.forEach(address => {
      if (address.valid) {
        addressList.push({
          addressType: address.get('addressType').value,
          street: address.get('street').value,
          city: address.get('city').value,
          postalCode: address.get('postalCode').value,
          description: address.get('description').value
        })
      }
    })
    return addressList;
  }

  createEmployee() {
    if (this.verifyCreateForm()) {

      let employeePhoto: string = null;
      if (this.finalImage) {
        employeePhoto = this.finalImage.split('base64')[1];
      }
      this.store.dispatch(new CreateEmployeeAction({
        username: this.employeeForm.get('username').value,
        password: this.employeeForm.get('password').value,
        roles: this.employeeForm.get('roles').value,
        employeeType: this.employeeForm.get('employeeType').value,
        firstName: this.employeeForm.get('firstName').value,
        lastName: this.employeeForm.get('lastName').value,
        email: this.employeeForm.get('email').value,
        phone: this.employeeForm.get('phone').value,
        sex: this.employeeForm.get('sex').value,
        birthDate: this.employeeForm.get('birthDate').value,
        address: this.createAddressList()
      },
        employeePhoto))
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
      this.finalImage = result;
    });
  }

  deleteImage() {
    this.finalImage = null;
  }


}


