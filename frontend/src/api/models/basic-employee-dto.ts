/* tslint:disable */
export interface BasicEmployeeDto {
  employeeType?: 'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST';
  firstName?: string;
  id?: number;
  lastName?: string;
  photo?: string;
}
