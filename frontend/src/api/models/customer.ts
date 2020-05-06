/* tslint:disable */
import { CompanyContact } from './company-contact';
import { Role } from './role';
export interface Customer {
  companyCity?: string;
  companyName?: string;
  companyNip?: string;
  companyPostalCode?: string;
  companyRegon?: string;
  companyStreet?: string;
  contacts?: Array<CompanyContact>;
  createdBy?: string;
  createdDate?: string;
  id?: number;
  password?: string;
  photo?: string;
  roles?: Array<Role>;
  userType?: 'EMPLOYEE' | 'CUSTOMER';
  username?: string;
}
