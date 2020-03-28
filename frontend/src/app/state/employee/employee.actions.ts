import { Employee, PageBasicEmployeeDto } from 'src/api/models';

export class GetBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] GetBasicEmployeeDtoPageAction';
  constructor(public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}

export class GetBasicEmployeeDtoListAction {
  static readonly type = '[Employee] GetBasicEmployeeDtoListAction';
  constructor() { }
}

export class GetEmployeeAction {
  static readonly type = '[Employee] GetEmployeeAction';
  constructor(public id: number) { }
}

export class GetAllEmployeeTypesAction {
  static readonly type = '[Employee] GetAllEmployeeTypesAction';
  constructor() { }
}

export class CreateEmployeeAction {
  static readonly type = '[Employee] CreateEmployeeAction';
  constructor(public employee: Employee, public employeePhoto?: string) { }
}

export class UpdateEmployeeAction {
  static readonly type = '[Employee] UpdateEmployeeAction';
  constructor(public employee: Employee, public employeePhoto?: string) { }
}

export class UpdateEmployeePhotoAction {
  static readonly type = '[Employee] UpdateEmployeePhotoAction';
  constructor(public employeeId: number, public employeePhoto: string) { }
}

export class DeleteEmployeeAction {
  static readonly type = '[Employee] DeleteEmployeeAction';
  constructor(public employeeId: number) { }
}


// EmployeeStateSetters
export class SetEmployeeAction {
  static readonly type = '[Employee] SetEmployeeAction';
  constructor(public employee: Employee) { }
}
export class SetBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] SetBasicEmployeeDtoPageAction';
  constructor(public basicEmployeeDtoPage: PageBasicEmployeeDto) { }
}
