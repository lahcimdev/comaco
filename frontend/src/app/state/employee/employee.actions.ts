import { Employee } from 'src/api/models';

export class GetBasicEmployeeDtoPageAction {
  static readonly type = '[Employee] GetBasicEmployeeDtoPageAction';
  constructor(public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}

export class GetAllEmployeeTypesAction {
  static readonly type = '[Employee] GetAllEmployeeTypesAction';
  constructor() { }
}

export class CreateEmployeeAction {
  static readonly type = '[User] CreateEmployeeAction';
  constructor(public employee: Employee, public employeePhoto?: string) { }
}

export class UpdateEmployeePhotoAction {
  static readonly type = '[User] UpdateEmployeePhotoAction';
  constructor(public employeeId: number, public employeePhoto: string) { }
}