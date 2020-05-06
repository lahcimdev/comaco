import { Employee, PageBasicEmployeeDto, EmployeeDto } from 'src/api/models';

export class GetBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] GetBasicEmployeeDtoPageAction';
  constructor(public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}

export class GetBasicEmployeeDtoListAction {
  static readonly type = '[Employee] GetBasicEmployeeDtoListAction';
  constructor() { }
}

export class GetEmployeeDtoAction {
  static readonly type = '[Employee] GetEmployeeDtoAction';
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
  constructor(public employeeDto: EmployeeDto, public employeePhoto?: string) { }
}

export class UpdateEmployeePhotoAction {
  static readonly type = '[Employee] UpdateEmployeePhotoAction';
  constructor(public employeeId: number, public employeePhoto: string) { }
}

export class DeleteEmployeeAction {
  static readonly type = '[Employee] DeleteEmployeeAction';
  constructor(public employeeId: number) { }
}

export class DeleteEmployeeAndUpdateBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] DeleteEmployeeAndUpdateBasicEmployeeDtoPageAction';
  constructor(public employeeId: number, public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}


// EmployeeStateSetters
export class SetEmployeeDtoAction {
  static readonly type = '[Employee] SetEmployeeDtoAction';
  constructor(public employeeDto: EmployeeDto) { }
}
export class SetBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] SetBasicEmployeeDtoPageAction';
  constructor(public basicEmployeeDtoPage: PageBasicEmployeeDto) { }
}
