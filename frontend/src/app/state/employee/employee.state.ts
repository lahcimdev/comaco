import { BasicEmployeeDto } from './../../../api/models/basic-employee-dto';
import { PageBasicEmployeeDto, Employee } from 'src/api/models';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetBasicEmployeeDtoPageAction, GetAllEmployeeTypesAction, CreateEmployeeAction, UpdateEmployeePhotoAction, GetBasicEmployeeDtoListAction, GetEmployeeAction, SetEmployeeStateEmployeeAction, UpdateEmployeeAction } from './employee.actions';
import { EmployeeControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';

export class EmployeeStateModel {

  public employeeTypes;
  public basicEmployeeDtoList: Array<BasicEmployeeDto>;
  public basicEmployeeDtoPage: PageBasicEmployeeDto;
  public employee: Employee;

}

@State<EmployeeStateModel>({
  name: 'employee',
  defaults: {
    employeeTypes: null,
    basicEmployeeDtoList: null,
    basicEmployeeDtoPage: null,
    employee: null
  }
})

export class EmployeeState {

  @Selector()
  static getEmployee(employeeStateModel: EmployeeStateModel) {
    return employeeStateModel.employee;
  }

  constructor(private employeeService: EmployeeControllerService) { }

  @Action(GetBasicEmployeeDtoPageAction)
  getBasicEmployeeDtoPage(ctx: StateContext<EmployeeStateModel>, { page, size, sort, properties, filter }: GetBasicEmployeeDtoPageAction) {
    return this.employeeService.getBasicEmployeeDtoPageUsingGET({ page, size, sort, properties, filter }).pipe(
      tap(basicEmployeeDtoPage => {
        ctx.patchState({ basicEmployeeDtoPage: basicEmployeeDtoPage });
      }),
    );
  }

  @Action(GetBasicEmployeeDtoListAction)
  getBasicEmployeeDtoList(ctx: StateContext<EmployeeStateModel>, {  }: GetBasicEmployeeDtoPageAction) {
    return this.employeeService.getBasicEmployeeDtoListUsingGET().pipe(
      tap(basicEmployeeDtoList => {
        ctx.patchState({ basicEmployeeDtoList: basicEmployeeDtoList });
      }),
    );
  }

  @Action(GetEmployeeAction)
  getEmployee(ctx: StateContext<EmployeeStateModel>, { id }: GetEmployeeAction) {
    return this.employeeService.getEmployeeUsingGET(id).pipe(
      tap(employee => {
        ctx.patchState({employee: employee})
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
  updateEmployee(ctx: StateContext<EmployeeStateModel>, {employee, employeePhoto }: UpdateEmployeeAction) {
    return this.employeeService.updateEmployeeUsingPUT( employee ).pipe(
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
    return this.employeeService.updateEmployeePhotoUsingPOST({ id: employeeId, employeePhoto }).pipe(
      tap( () => console.log("Poprawnie dokonane aktualizacji PhotoEmployee"))
    );
  }


  // EmployeeStateSetters
  @Action(SetEmployeeStateEmployeeAction)
  setEmployeeStateEmployee(ctx: StateContext<EmployeeStateModel>, { employee }: SetEmployeeStateEmployeeAction) {
    ctx.patchState({employee: employee});
  }

  









}
