import { Customer, PageBasicCustomerDto, CustomerDto } from 'src/api/models';

export class CreateCustomerAction {
  static readonly type = '[Customer] CreateCustomerAction';
  constructor(public customer: Customer, public customerPhoto?: string) { }
}

export class UpdateCustomerAction {
  static readonly type = '[Customer] UpdateCustomerAction';
  constructor(public customerDto: CustomerDto, public customerPhoto?: string) { }
}

export class GetCustomerDtoAction {
  static readonly type = '[Customer] GetCustomerDtoAction';
  constructor(public id: number) { }
}

export class UpdateCustomerPhotoAction {
  static readonly type = '[Customer] UpdateCustomerPhotoAction';
  constructor(public customerId: number, public customerPhoto: string) { }
}

export class GetBasicCustomerDtoListAction {
  static readonly type = '[Customer] GetBasicCustomerDtoListAction';
  constructor() { }
}

export class GetBasicCustomerDtoPageAction {
  static readonly type = '[Customer] GetBasicCustomerDtoPageAction';
  constructor(public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}

export class DeleteCustomerAction {
  static readonly type = '[Customer] DeleteCustomerAction';
  constructor(public customerId: number) { }
}

export class DeleteCustomerAndUpdateBasicCustomerDtoPageAction {
  static readonly type = '[Customer] DeleteCustomerAndUpdateBasicCustomerDtoPageAction';
  constructor(public customerId: number, public page: number, public size: number, public sort?: 'ASC' | 'DESC', public properties?: string[], public filter?: string) { }
}

// EmployeeStateSetters
export class SetCustomerDtoAction {
  static readonly type = '[Customer] SetCustomerDtoAction';
  constructor(public customerDto: CustomerDto) { }
}

export class SetBasicCustomerDtoPageAction {
  static readonly type = '[Customer] SetBasicCustomerDtoPageAction';
  constructor(public basicCustomerDtoPage: PageBasicCustomerDto) { }
}
