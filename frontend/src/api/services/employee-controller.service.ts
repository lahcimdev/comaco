/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BasicEmployeeDto } from '../models/basic-employee-dto';
import { Employee } from '../models/employee';
import { PageBasicEmployeeDto } from '../models/page-basic-employee-dto';

/**
 * Employee Controller
 */
@Injectable({
  providedIn: 'root',
})
class EmployeeControllerService extends __BaseService {
  static readonly getBasicEmployeeDtoListUsingGETPath = '/api/employee/list';
  static readonly createEmployeeUsingPOSTPath = '/api/employee/new';
  static readonly getBasicEmployeeDtoPageUsingGETPath = '/api/employee/page';
  static readonly getAllEmployeeTypesUsingGETPath = '/api/employee/types';
  static readonly updateEmployeeUsingPUTPath = '/api/employee/update';
  static readonly getEmployeeUsingGETPath = '/api/employee/{id}';
  static readonly updateEmployeePhotoUsingPOSTPath = '/api/employee/{id}/photo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getBasicEmployeeDtoListUsingGETResponse(): __Observable<__StrictHttpResponse<Array<BasicEmployeeDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
        return _r as __StrictHttpResponse<Array<BasicEmployeeDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  getBasicEmployeeDtoListUsingGET(): __Observable<Array<BasicEmployeeDto>> {
    return this.getBasicEmployeeDtoListUsingGETResponse().pipe(
      __map(_r => _r.body as Array<BasicEmployeeDto>)
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

  /**
   * @param params The `EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * - `sort`: sort
   *
   * - `properties`: properties
   *
   * - `filter`: filter
   *
   * @return OK
   */
  getBasicEmployeeDtoPageUsingGETResponse(params: EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams): __Observable<__StrictHttpResponse<PageBasicEmployeeDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    (params.properties || []).forEach(val => {if (val != null) __params = __params.append('properties', val.toString())});
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/employee/page`,
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
   * - `sort`: sort
   *
   * - `properties`: properties
   *
   * - `filter`: filter
   *
   * @return OK
   */
  getBasicEmployeeDtoPageUsingGET(params: EmployeeControllerService.GetBasicEmployeeDtoPageUsingGETParams): __Observable<PageBasicEmployeeDto> {
    return this.getBasicEmployeeDtoPageUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageBasicEmployeeDto)
    );
  }

  /**
   * @return OK
   */
  getAllEmployeeTypesUsingGETResponse(): __Observable<__StrictHttpResponse<Array<'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST'>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/employee/types`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST'>>;
      })
    );
  }
  /**
   * @return OK
   */
  getAllEmployeeTypesUsingGET(): __Observable<Array<'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST'>> {
    return this.getAllEmployeeTypesUsingGETResponse().pipe(
      __map(_r => _r.body as Array<'DIRECTOR' | 'MAIN_MANAGER' | 'MANAGER' | 'SALES_MANAGER' | 'IT_SPECIALIST'>)
    );
  }

  /**
   * @param employee employee
   * @return OK
   */
  updateEmployeeUsingPUTResponse(employee: Employee): __Observable<__StrictHttpResponse<Employee>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = employee;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/employee/update`,
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
  updateEmployeeUsingPUT(employee: Employee): __Observable<Employee> {
    return this.updateEmployeeUsingPUTResponse(employee).pipe(
      __map(_r => _r.body as Employee)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getEmployeeUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Employee>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/employee/${id}`,
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
   * @param id id
   * @return OK
   */
  getEmployeeUsingGET(id: number): __Observable<Employee> {
    return this.getEmployeeUsingGETResponse(id).pipe(
      __map(_r => _r.body as Employee)
    );
  }

  /**
   * @param params The `EmployeeControllerService.UpdateEmployeePhotoUsingPOSTParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `employeePhoto`: employeePhoto
   */
  updateEmployeePhotoUsingPOSTResponse(params: EmployeeControllerService.UpdateEmployeePhotoUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.employeePhoto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/employee/${params.id}/photo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `EmployeeControllerService.UpdateEmployeePhotoUsingPOSTParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `employeePhoto`: employeePhoto
   */
  updateEmployeePhotoUsingPOST(params: EmployeeControllerService.UpdateEmployeePhotoUsingPOSTParams): __Observable<null> {
    return this.updateEmployeePhotoUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
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

    /**
     * sort
     */
    sort?: 'ASC' | 'DESC';

    /**
     * properties
     */
    properties?: Array<string>;

    /**
     * filter
     */
    filter?: string;
  }

  /**
   * Parameters for updateEmployeePhotoUsingPOST
   */
  export interface UpdateEmployeePhotoUsingPOSTParams {

    /**
     * id
     */
    id: number;

    /**
     * employeePhoto
     */
    employeePhoto: string;
  }
}

export { EmployeeControllerService }
