export class EmployeeAction {
  static readonly type = '[Employee] Add item';
  constructor(public payload: string) { }
}
