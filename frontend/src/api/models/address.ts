/* tslint:disable */
import { Employee } from './employee';
export interface Address {
  addressType?: 'MAIN' | 'ADDITIONAL';
  city?: string;
  description?: string;
  employee?: Employee;
  id?: number;
  postalCode?: string;
  street?: string;
}
