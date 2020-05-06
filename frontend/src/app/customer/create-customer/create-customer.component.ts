import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserPhotoComponent } from 'src/app/components/user-photo/user-photo.component';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { CreateCustomerAction } from 'src/app/state/customer/customer.actions';
import { CompanyContact } from 'src/api/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {

  customerForm: FormGroup;
  contactForm: FormGroup[] = [];

  selectedTab = new FormControl(0);

  finalImage: string = null;
  dialogImage: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store, private dialog: MatDialog) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyStreet: ['', [Validators.required]],
      companyPostalCode: ['', [Validators.required]],
      companyCity: ['', [Validators.required]],
      companyNip: ['', [Validators.required]],
      companyRegon: [''],
    })

    this.contactForm.push(this.formBuilder.group({
      name: ['create-edit-customer.addContact', [Validators.required]],
      person: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      description: [''],
    }))

  }

  ngOnDestroy(): void {
    if (this.dialogImage) {
      this.dialogImage.unsubscribe();
    }
  }

  addContact() {
    this.contactForm.push(this.formBuilder.group({
      name: ['create-edit-customer.addContact', [Validators.required]],
      person: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      description: [''],
    }))
    this.selectedTab.setValue(this.contactForm.length - 1);
  }

  removeContact(index: number) {
    if (this.contactForm.length > 1) {
      if (this.contactForm.length - 1 == index && this.selectedTab.value != 0) {
        this.selectedTab.setValue(index - 1);
      }
      this.contactForm.splice(index, 1);
    } else {
      console.log('Jedno pole kontaktowe jest wymagane');
    }
  }

  errorHandlingCustomer(control: string, error: string) {
    return this.customerForm.controls[control].hasError(error);
  }

  errorHandlingContact(selectedTab: number, control: string, error: string) {
    return this.contactForm[selectedTab].controls[control].hasError(error);
  }

  verifyCreateCustomerForm(): boolean {
    let result: boolean = true;
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      result = false;
    }

    for (let i = 0; i < this.contactForm.length; i++) {
      if (this.contactForm[i].invalid) {
        this.contactForm[i].markAllAsTouched();
        result = false;
      }
    }

    if (this.customerForm.get('password').value != this.customerForm.get('passwordConfirm').value) {
      console.log('Hasła sa nie takie same');
      result = false;
    }

    return result;
  }

  createContactList(): Array<CompanyContact> {
    let contactList: Array<CompanyContact> = []
    this.contactForm.forEach(contact => {
      contactList.push({
        name: contact.get('name').value,
        person: contact.get('person').value,
        email: contact.get('email').value,
        phone: contact.get('phone').value,
        description: contact.get('description').value,
      })
    })
    return contactList;
  }

  createCustomer() {
    if (this.verifyCreateCustomerForm()) {

      let employeePhoto: string = null;
      if (this.finalImage) {
        employeePhoto = this.finalImage.split('base64')[1];
      }

      this.store.dispatch(new CreateCustomerAction({
        username: this.customerForm.get('username').value,
        password: this.customerForm.get('password').value,
        roles: [{ id: 2, name: 'ROLE_CUSTOMER' }],
        companyName: this.customerForm.get('companyName').value,
        companyStreet: this.customerForm.get('companyStreet').value,
        companyPostalCode: this.customerForm.get('companyPostalCode').value,
        companyCity: this.customerForm.get('companyCity').value,
        companyNip: this.customerForm.get('companyNip').value,
        companyRegon: this.customerForm.get('companyRegon').value,
        contacts: this.createContactList(),
      },
        employeePhoto
      ))
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
