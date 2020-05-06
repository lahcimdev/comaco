/* tslint:disable */
import { CompanyContact } from './company-contact';
import { Role } from './role';
export interface CustomerDto {
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
  photo?: string;
  roles?: Array<Role>;
  username?: string;
}
