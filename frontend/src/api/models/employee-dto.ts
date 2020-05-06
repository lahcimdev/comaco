/* tslint:disable */
import { Address } from './address';
import { Role } from './role';
export interface EmployeeDto {
  address?: Array<Address>;
  birthDate?: string;
  createdBy?: string;
  createdDate?: string;
  email?: string;
  employeeType?: 'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST';
  firstName?: string;
  id?: number;
  lastName?: string;
  phone?: string;
  photo?: string;
  roles?: Array<Role>;
  sex?: 'MALE' | 'FEMALE';
  username?: string;
}
