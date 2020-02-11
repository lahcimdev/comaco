import { PageBasicEmployeeDto } from 'src/api/models';
import { State, Action, StateContext } from '@ngxs/store';
import { GetBasicEmployeeDtoPageAction, GetAllEmployeeTypesAction, CreateEmployeeAction, UpdateEmployeePhotoAction } from './employee.actions';
import { EmployeeControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { UpdateUserStateAction } from '../user/user.actions';

export class EmployeeStateModel {

  public employeeTypes;
  public basicEmployeeDtoPage: PageBasicEmployeeDto;

}

@State<EmployeeStateModel>({
  name: 'employee',
  defaults: {
    employeeTypes: null,
    basicEmployeeDtoPage: null
  }
})

export class EmployeeState {


  constructor(private employeeService: EmployeeControllerService) { }

  @Action(GetBasicEmployeeDtoPageAction)
  getBasicEmployeeDtoPage(ctx: StateContext<EmployeeStateModel>, { page, size, sort, properties, filter }: GetBasicEmployeeDtoPageAction) {
    return this.employeeService.getBasicEmployeeDtoPageUsingGET({ page, size, sort, properties, filter }).pipe(
      tap(basicEmployeeDtoPage => {
        ctx.patchState({ basicEmployeeDtoPage: basicEmployeeDtoPage });
      }),
    );
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
        if (employeePhoto) {
          ctx.dispatch(new UpdateEmployeePhotoAction(employee.id, employeePhoto));
        }
      })
    )
  }

  @Action(UpdateEmployeePhotoAction)
  updateEmployeePhoto(ctx: StateContext<EmployeeStateModel>, { employeeId, employeePhoto }: UpdateEmployeePhotoAction) {
    return this.employeeService.updateEmployeePhotoUsingPOST({ id: employeeId, employeePhoto });
  }









}
