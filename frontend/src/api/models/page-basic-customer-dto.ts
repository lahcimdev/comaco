/* tslint:disable */
import { BasicCustomerDto } from './basic-customer-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageBasicCustomerDto {
  content?: Array<BasicCustomerDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
