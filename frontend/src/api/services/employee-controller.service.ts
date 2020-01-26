/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Employee } from '../models/employee';
import { PageBasicEmployeeDto } from '../models/page-basic-employee-dto';

/**
 * Employee Controller
 */
@Injectable({
  providedIn: 'root',
})
class EmployeeControllerService extends __BaseService {
  static readonly getAuthenticatedEmployeeUsingGETPath = '/api/employee';
  static readonly getBasicEmployeeDtoPageUsingGETPath = '/api/employee/list';
  static readonly createEmployeeUsingPOSTPath = '/api/employee/new';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getAuthenticatedEmployeeUsingGETResponse(): __Observable<__StrictHttpResponse<Employee>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/employee`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Employee>;
      })
    );
  }
  /**
   * @return OK
   */
  getAuthenticatedEmployeeUsingGET(): __Observable<Employee> {
    return this.getAuthenticatedEmployeeUsingGETResponse().pipe(
      __map(_r => _r.body as Employee)
    );
  }

  /**
   * @param params The `EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getBasicEmployeeDtoPageUsingGETResponse(params: EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams): __Observable<__StrictHttpResponse<PageBasicEmployeeDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/employee/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageBasicEmployeeDto>;
      })
    );
  }
  /**
   * @param params The `EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getBasicEmployeeDtoPageUsingGET(params: EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams): __Observable<PageBasicEmployeeDto> {
    return this.getBasicEmployeeDtoPageUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageBasicEmployeeDto)
    );
  }

  /**
   * @param employee employee
   * @return OK
   */
  createEmployeeUsingPOSTResponse(employee: Employee): __Observable<__StrictHttpResponse<Employee>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = employee;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/employee/new`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Employee>;
      })
    );
  }
  /**
   * @param employee employee
   * @return OK
   */
  createEmployeeUsingPOST(employee: Employee): __Observable<Employee> {
    return this.createEmployeeUsingPOSTResponse(employee).pipe(
      __map(_r => _r.body as Employee)
    );
  }
}

module EmployeeControllerService {

  /**
   * Parameters for getBasicEmployeeDtoPageUsingGET
   */
  export interface GetBasicEmployeeDtoPageUsingGETParams {

    /**
     * size
     */
    size: number;

    /**
     * page
     */
    page: number;
  }
}

export { EmployeeControllerService }
