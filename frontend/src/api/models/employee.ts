/* tslint:disable */
import { Role } from './role';
export interface Employee {
  employee?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  password?: string;
  roles?: Array<Role>;
  userType?: 'EMPLOYEE' | 'CUSTOMER';
  username?: string;
}
