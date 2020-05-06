import { BasicEmployeeDto } from './../../../api/models/basic-employee-dto';
import { PageBasicEmployeeDto, Employee, EmployeeDto } from 'src/api/models';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetBasicEmployeeDtoPageAction, GetAllEmployeeTypesAction, CreateEmployeeAction, UpdateEmployeePhotoAction, GetBasicEmployeeDtoListAction, UpdateEmployeeAction, DeleteEmployeeAction, SetBasicEmployeeDtoPageAction, DeleteEmployeeAndUpdateBasicEmployeeDtoPageAction, GetEmployeeDtoAction, SetEmployeeDtoAction } from './employee.actions';
import { EmployeeControllerService, UserControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';

export class EmployeeStateModel {

  public employeeDto: EmployeeDto;
  public employeeTypes;
  public basicEmployeeDtoList: Array<BasicEmployeeDto>;
  public basicEmployeeDtoPage: PageBasicEmployeeDto;

}

@State<EmployeeStateModel>({
  name: 'employee',
  defaults: {
    employeeDto: null,
    employeeTypes: null,
    basicEmployeeDtoList: null,
    basicEmployeeDtoPage: null
  }
})

export class EmployeeState {

  @Selector()
  static getEmployeeDto(employeeStateModel: EmployeeStateModel) {
    return employeeStateModel.employeeDto;
  }

  constructor(private employeeService: EmployeeControllerService, private userService: UserControllerService) { }

  @Action(GetBasicEmployeeDtoPageAction)
  getBasicEmployeeDtoPage(ctx: StateContext<EmployeeStateModel>, { page, size, sort, properties, filter }: GetBasicEmployeeDtoPageAction) {
    return this.employeeService.getBasicEmployeeDtoPageUsingGET({ page, size, sort, properties, filter }).pipe(
      tap(basicEmployeeDtoPage => {
        ctx.patchState({ basicEmployeeDtoPage: basicEmployeeDtoPage });
      }),
    );
  }

  @Action(GetBasicEmployeeDtoListAction)
  getBasicEmployeeDtoList(ctx: StateContext<EmployeeStateModel>, { }: GetBasicEmployeeDtoPageAction) {
    return this.employeeService.getBasicEmployeeDtoListUsingGET().pipe(
      tap(basicEmployeeDtoList => {
        ctx.patchState({ basicEmployeeDtoList: basicEmployeeDtoList });
      }),
    );
  }

  @Action(GetEmployeeDtoAction)
  getEmployeeDto(ctx: StateContext<EmployeeStateModel>, { id }: GetEmployeeDtoAction) {
    return this.employeeService.getEmployeeDtoUsingGET(id).pipe(
      tap(employeeDto => {
        ctx.patchState({ employeeDto: employeeDto })
      })
    )
  }

  @Action(GetAllEmployeeTypesAction)
  getAllEmployeeTypes(ctx: StateContext<EmployeeStateModel>, { }: GetAllEmployeeTypesAction) {
    return this.employeeService.getAllEmployeeTypesUsingGET().pipe(
      tap(employeeTypes => {
        ctx.patchState({ employeeTypes: employeeTypes });
      })
    )
  }

  @Action(CreateEmployeeAction)
  createEmployee(ctx: StateContext<EmployeeStateModel>, { employee, employeePhoto }: CreateEmployeeAction) {
    return this.employeeService.createEmployeeUsingPOST(employee).pipe(
      tap(employee => {
        console.log("Utworzono nowego Employee o ID: " + employee.id);
        if (employeePhoto) {
          ctx.dispatch(new UpdateEmployeePhotoAction(employee.id, employeePhoto));
        }
      })
    )
  }

  @Action(UpdateEmployeeAction)
  updateEmployee(ctx: StateContext<EmployeeStateModel>, { employeeDto, employeePhoto }: UpdateEmployeeAction) {
    return this.employeeService.updateEmployeeUsingPUT(employeeDto).pipe(
      tap(employee => {
        console.log("Zaktualizowano Employee o ID: " + employee.id);
        if (employeePhoto) {
          ctx.dispatch(new UpdateEmployeePhotoAction(employee.id, employeePhoto));
          
        }
      })
    )
  }

  @Action(UpdateEmployeePhotoAction)
  updateEmployeePhoto(ctx: StateContext<EmployeeStateModel>, { employeeId, employeePhoto }: UpdateEmployeePhotoAction) {
    return this.employeeService.updateEmployeePhotoUsingPUT({ id: employeeId, employeePhoto }).pipe(
      tap(() => console.log("Poprawnie dokonane aktualizacji PhotoEmployee"))
    );
  }

  @Action(DeleteEmployeeAction)
  deleteEmployee(ctx: StateContext<EmployeeStateModel>, { employeeId }: DeleteEmployeeAction) {
    return this.userService.deleteUserUsingDELETE(employeeId).pipe(
      tap(() => {
        console.log("Usunięto Employee o ID: " + employeeId)
      }
      )
    );
  }

  @Action(DeleteEmployeeAndUpdateBasicEmployeeDtoPageAction)
  deleteEmployeeAndUpdateBasicEmployeeDtoPage(ctx: StateContext<EmployeeStateModel>, { employeeId, page, size, sort, properties, filter }: DeleteEmployeeAndUpdateBasicEmployeeDtoPageAction) {
    return this.userService.deleteUserUsingDELETE(employeeId).pipe(
      tap(() => {
        ctx.dispatch(new GetBasicEmployeeDtoPageAction(page, size, sort, properties, filter));
      }
      )
    );
    
  }


  // EmployeeStateSetters
  @Action(SetEmployeeDtoAction)
  setEmployeeDtoStateEmployee(ctx: StateContext<EmployeeStateModel>, { employeeDto }: SetEmployeeDtoAction) {
    ctx.patchState({ employeeDto: employeeDto });
  }
  @Action(SetBasicEmployeeDtoPageAction)
  setBasicEmployeeDtoPage(ctx: StateContext<EmployeeStateModel>, { basicEmployeeDtoPage }: SetBasicEmployeeDtoPageAction) {
    ctx.patchState({ basicEmployeeDtoPage: basicEmployeeDtoPage });
  }










}
