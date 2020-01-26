/* tslint:disable */
import { BasicEmployeeDto } from './basic-employee-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageBasicEmployeeDto {
  content?: Array<BasicEmployeeDto>;
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
