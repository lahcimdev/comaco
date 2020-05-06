import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateCustomerAction, UpdateCustomerPhotoAction, GetBasicCustomerDtoPageAction, SetBasicCustomerDtoPageAction, GetBasicCustomerDtoListAction, UpdateCustomerAction, DeleteCustomerAction, DeleteCustomerAndUpdateBasicCustomerDtoPageAction, GetCustomerDtoAction, SetCustomerDtoAction } from './customer.actions';
import { CustomerControllerService, UserControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { PageBasicCustomerDto, BasicEmployeeDto, CustomerDto } from 'src/api/models';

export class CustomerStateModel {

  public customerDto: CustomerDto;
  public basicCustomerDtoList: Array<BasicEmployeeDto>;
  public basicCustomerDtoPage: PageBasicCustomerDto;

}

@State<CustomerStateModel>({
  name: 'customer',
  defaults: {
    customerDto: null,
    basicCustomerDtoList: null,
    basicCustomerDtoPage: null
  }
})
export class CustomerState {

  constructor(private customerService: CustomerControllerService, private userService: UserControllerService) { }

  @Selector()
  static getCustomerDto(customerStateModel: CustomerStateModel) {
    return customerStateModel.customerDto;
  }

  @Action(CreateCustomerAction)
  createCustomer(ctx: StateContext<CustomerStateModel>, { customer, customerPhoto }: CreateCustomerAction) {
    return this.customerService.createCustomerUsingPOST(customer).pipe(
      tap(customer => {
        console.log('Utworzono nowego Customer o ID: ' + customer.id);
        if (customerPhoto) {
          ctx.dispatch(new UpdateCustomerPhotoAction(customer.id, customerPhoto));
        }
      })
    )
  }

  @Action(UpdateCustomerAction)
  updateCustomer(ctx: StateContext<CustomerStateModel>, { customerDto, customerPhoto }: UpdateCustomerAction) {
    return this.customerService.updateCustomerUsingPUT(customerDto).pipe(
      tap(customer => {
        console.log('Edytowano nowego Customer o ID: ' + customer.id);
        if (customerPhoto) {
          ctx.dispatch(new UpdateCustomerPhotoAction(customer.id, customerPhoto));
        }
      })
    )

  }

  @Action(GetCustomerDtoAction)
  getCustomer(ctx: StateContext<CustomerStateModel>, { id }: GetCustomerDtoAction) {
    return this.customerService.getCustomerDtoUsingGET(id).pipe(
      tap(customerDto => {
        ctx.patchState({ customerDto: customerDto });
      })
    )
  }

  @Action(UpdateCustomerPhotoAction)
  updateCustomerPhoto(ctx: StateContext<CustomerStateModel>, { customerId, customerPhoto }: UpdateCustomerPhotoAction) {
    return this.customerService.updateCustomerPhotoUsingPOST({ id: customerId, customerPhoto }).pipe(
      tap(() => console.log("Poprawnie dokonane aktualizacji PhotoCustomer"))
    )
  }

  @Action(GetBasicCustomerDtoListAction)
  getBasicCustomerDtoList(ctx: StateContext<CustomerStateModel>, { }: GetBasicCustomerDtoListAction) {
    return this.customerService.getBasicCustomerDtoListUsingGET().pipe(
      tap(basicCustomerDtoList => {
        ctx.patchState({ basicCustomerDtoList: basicCustomerDtoList })
      })
    )
  }

  @Action(GetBasicCustomerDtoPageAction)
  getBasicCustomerDtoPage(ctx: StateContext<CustomerStateModel>, { page, size, sort, properties, filter }: GetBasicCustomerDtoPageAction) {
    return this.customerService.getBasicCustomerDtoPageUsingGET({ page, size, sort, properties, filter }).pipe(
      tap(basicCustomerDtoPage => {
        ctx.patchState({ basicCustomerDtoPage: basicCustomerDtoPage })
      })
    )
  }

  @Action(DeleteCustomerAction)
  deleteCustomer(ctx: StateContext<CustomerStateModel>, { customerId }: DeleteCustomerAction) {
    return this.userService.deleteUserUsingDELETE(customerId).pipe(
      tap(() => {
        console.log("Usunięto Customer o ID: " + customerId)
      }
      )
    );
  }

  @Action(DeleteCustomerAndUpdateBasicCustomerDtoPageAction)
  deleteCustomerAndUpdateBasicCustomerDtoPage(ctx: StateContext<CustomerStateModel>, { customerId, page, size, sort, properties, filter }: DeleteCustomerAndUpdateBasicCustomerDtoPageAction) {
    return this.userService.deleteUserUsingDELETE(customerId).pipe(
      tap(() => {
        ctx.dispatch(new GetBasicCustomerDtoPageAction(page, size, sort, properties, filter));
      }
      )
    );
    
  }

  // EmployeeStateSetters
  @Action(SetCustomerDtoAction)
  setCustomer(ctx: StateContext<CustomerStateModel>, { customerDto }: SetCustomerDtoAction) {
    ctx.patchState({ customerDto: customerDto });
  }

  @Action(SetBasicCustomerDtoPageAction)
  setBasicCustomerDtoPage(ctx: StateContext<CustomerStateModel>, { basicCustomerDtoPage }: SetBasicCustomerDtoPageAction) {
    ctx.patchState({ basicCustomerDtoPage: basicCustomerDtoPage });
  }

}
