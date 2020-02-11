/* tslint:disable */
import { Role } from './role';
export interface AuthenticatedUserDto {
  firstName?: string;
  lastName?: string;
  photo?: string;
  roles?: Array<Role>;
  userType?: 'EMPLOYEE' | 'CUSTOMER';
  username?: string;
}
