import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasicCustomerDto, Customer, CompanyContact, CustomerDto } from 'src/api/models';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { GetBasicCustomerDtoListAction, UpdateCustomerAction, GetCustomerDtoAction, SetCustomerDtoAction } from 'src/app/state/customer/customer.actions';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import { UserPhotoComponent } from 'src/app/components/user-photo/user-photo.component';
import { MatDialog } from '@angular/material';
import { CustomerState } from 'src/app/state/customer/customer.state';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnDestroy {

  editCustomerId: number;
  customerPhoto: string;

  customerListForm: FormGroup;
  customerForm: FormGroup;
  contactForm: FormGroup[];

  selectedTab = new FormControl(0);

  pathSubscription: Subscription;
  customerSubscription: Subscription;
  dialogImage: Subscription;

  constructor(private store: Store, private formBuilder: FormBuilder, private acttivatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  @Select(state => state.customer.basicCustomerDtoList)
  basicCustomerDtoList$: Observable<Array<BasicCustomerDto>>;
  @Select(state => state.customer.customerDto)
  customerDto$: Observable<CustomerDto>;

  ngOnInit() {
    this.store.dispatch(new GetBasicCustomerDtoListAction());

    this.customerListForm = this.formBuilder.group({
      basicCustomerDto: ['']
    })

    this.customerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required]],
      companyStreet: ['', [Validators.required]],
      companyPostalCode: ['', [Validators.required]],
      companyCity: ['', [Validators.required]],
      companyNip: ['', [Validators.required]],
      companyRegon: [''],
    })

    this.pathSubscription = this.acttivatedRoute.params.subscribe(params => {
      this.editCustomerId = params['id'];
      if (this.editCustomerId > 0) {
        this.store.dispatch(new GetCustomerDtoAction(this.editCustomerId));
      }

      this.customerSubscription = this.customerDto$.subscribe(customer => {
        if (customer) {
          this.customerListForm.patchValue({
            basicCustomerDto: customer.id
          })

          this.customerForm.patchValue({
            username: customer.username,
            companyName: customer.companyName,
            companyStreet: customer.companyStreet,
            companyPostalCode: customer.companyPostalCode,
            companyCity: customer.companyCity,
            companyNip: customer.companyNip,
            companyRegon: customer.companyRegon
          })

          if (customer.photo) {
            this.customerPhoto = 'data:image/png;base64,' + customer.photo;
          }

          this.contactForm = [];
          this.selectedTab.setValue(0);

          customer.contacts.forEach(contact => {
            this.contactForm.push(this.formBuilder.group({
              id: [contact.id, [Validators.required]],
              name: [contact.name, [Validators.required]],
              person: [contact.person, [Validators.required]],
              email: [contact.email, [Validators.required, Validators.email]],
              phone: [contact.phone, [Validators.required]],
              description: [contact.description],
            }))
          })

        }
      })

    })

  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetCustomerDtoAction(null));
    this.pathSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
    if (this.dialogImage) {
      this.dialogImage.unsubscribe();
    }
  }

  errorHandlingCustomer(control: string, error: string) {
    return this.customerForm.controls[control].hasError(error);
  }

  errorHandlingContact(selectedTab: number, control: string, error: string) {
    return this.contactForm[selectedTab].controls[control].hasError(error);
  }

  changeCustomer(customerId: number) {
    if (customerId > 0) {
      this.store.dispatch(new Navigate(['edit-customer', customerId]))
    }
  }

  addContact() {
    this.contactForm.push(this.formBuilder.group({
      id: [null],
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

  verifyEditCustomerForm(): boolean {
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

    return result;
  }

  createContactList(): Array<CompanyContact> {
    let contactList: Array<CompanyContact> = []
    this.contactForm.forEach(contact => {
      contactList.push({
        id: contact.get('id').value,
        name: contact.get('name').value,
        person: contact.get('person').value,
        email: contact.get('email').value,
        phone: contact.get('phone').value,
        description: contact.get('description').value,
      })
    })
    return contactList;
  }

  createPhoto() {
    const baseCustomer = this.store.selectSnapshot(CustomerState.getCustomerDto);

    if (!baseCustomer.photo && this.customerPhoto) {
      return this.customerPhoto.split('base64,')[1];
    }
    if (baseCustomer.photo) {
      if (this.customerPhoto && (baseCustomer.photo != this.customerPhoto.split('base64,')[1])) {
        return this.customerPhoto.split('base64,')[1];
      }
      if (!this.customerPhoto) {
        return 'DELETE';
      }
    }
  }

  editCustomer() {
    if (this.verifyEditCustomerForm()) {
            
      let updatedCustomer: CustomerDto;

      updatedCustomer = {
        id: this.editCustomerId,
        username: this.customerForm.get('username').value,
        companyName: this.customerForm.get('companyName').value,
        companyStreet: this.customerForm.get('companyStreet').value,
        companyPostalCode: this.customerForm.get('companyPostalCode').value,
        companyCity: this.customerForm.get('companyCity').value,
        companyNip: this.customerForm.get('companyNip').value,
        companyRegon: this.customerForm.get('companyRegon').value,
        contacts: this.createContactList(),
        photo: this.createPhoto()
      }

      this.store.dispatch(new UpdateCustomerAction(updatedCustomer, updatedCustomer.photo));
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
      this.customerPhoto = result;
    });
  }

  deletePhoto() {
    this.customerPhoto = null;
  }

}
