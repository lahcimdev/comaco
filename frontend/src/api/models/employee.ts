/* tslint:disable */
import { Address } from './address';
import { Role } from './role';
export interface Employee {
  address?: Address;
  createdBy?: number;
  createdDate?: string;
  email?: string;
  employee?: string;
  employeeType?: 'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST';
  firstName?: string;
  id?: number;
  lastName?: string;
  password?: string;
  phone?: string;
  roles?: Array<Role>;
  userType?: 'EMPLOYEE' | 'CUSTOMER';
  username?: string;
}
