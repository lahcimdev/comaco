import { State, Action, StateContext } from '@ngxs/store';
import { EmployeeAction } from './employee.actions';

export class EmployeeStateModel {
  public items: string[];
}

@State<EmployeeStateModel>({
  name: 'employee',
  defaults: {
    items: []
  }
})
export class EmployeeState {
  @Action(EmployeeAction)
  add(ctx: StateContext<EmployeeStateModel>, action: EmployeeAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
