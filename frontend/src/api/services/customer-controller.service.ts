/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BasicCustomerDto } from '../models/basic-customer-dto';
import { Customer } from '../models/customer';
import { PageBasicCustomerDto } from '../models/page-basic-customer-dto';
import { CustomerDto } from '../models/customer-dto';

/**
 * Customer Controller
 */
@Injectable({
  providedIn: 'root',
})
class CustomerControllerService extends __BaseService {
  static readonly getBasicCustomerDtoListUsingGETPath = '/api/customer/list';
  static readonly createCustomerUsingPOSTPath = '/api/customer/new';
  static readonly getBasicCustomerDtoPageUsingGETPath = '/api/customer/page';
  static readonly updateCustomerUsingPUTPath = '/api/customer/update';
  static readonly getCustomerDtoUsingGETPath = '/api/customer/{id}';
  static readonly updateCustomerPhotoUsingPOSTPath = '/api/customer/{id}/photo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getBasicCustomerDtoListUsingGETResponse(): __Observable<__StrictHttpResponse<Array<BasicCustomerDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/customer/list`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<BasicCustomerDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  getBasicCustomerDtoListUsingGET(): __Observable<Array<BasicCustomerDto>> {
    return this.getBasicCustomerDtoListUsingGETResponse().pipe(
      __map(_r => _r.body as Array<BasicCustomerDto>)
    );
  }

  /**
   * @param customer customer
   * @return OK
   */
  createCustomerUsingPOSTResponse(customer: Customer): __Observable<__StrictHttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = customer;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/customer/new`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Customer>;
      })
    );
  }
  /**
   * @param customer customer
   * @return OK
   */
  createCustomerUsingPOST(customer: Customer): __Observable<Customer> {
    return this.createCustomerUsingPOSTResponse(customer).pipe(
      __map(_r => _r.body as Customer)
    );
  }

  /**
   * @param params The `CustomerControllerService.GetBasicCustomerDtoPageUsingGETParams` containing the following parameters:
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
  getBasicCustomerDtoPageUsingGETResponse(params: CustomerControllerService.GetBasicCustomerDtoPageUsingGETParams): __Observable<__StrictHttpResponse<PageBasicCustomerDto>> {
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
      this.rootUrl + `/api/customer/page`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageBasicCustomerDto>;
      })
    );
  }
  /**
   * @param params The `CustomerControllerService.GetBasicCustomerDtoPageUsingGETParams` containing the following parameters:
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
  getBasicCustomerDtoPageUsingGET(params: CustomerControllerService.GetBasicCustomerDtoPageUsingGETParams): __Observable<PageBasicCustomerDto> {
    return this.getBasicCustomerDtoPageUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageBasicCustomerDto)
    );
  }

  /**
   * @param customerDto customerDto
   * @return OK
   */
  updateCustomerUsingPUTResponse(customerDto: CustomerDto): __Observable<__StrictHttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = customerDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/customer/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Customer>;
      })
    );
  }
  /**
   * @param customerDto customerDto
   * @return OK
   */
  updateCustomerUsingPUT(customerDto: CustomerDto): __Observable<Customer> {
    return this.updateCustomerUsingPUTResponse(customerDto).pipe(
      __map(_r => _r.body as Customer)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getCustomerDtoUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CustomerDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/customer/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getCustomerDtoUsingGET(id: number): __Observable<CustomerDto> {
    return this.getCustomerDtoUsingGETResponse(id).pipe(
      __map(_r => _r.body as CustomerDto)
    );
  }

  /**
   * @param params The `CustomerControllerService.UpdateCustomerPhotoUsingPOSTParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `customerPhoto`: customerPhoto
   */
  updateCustomerPhotoUsingPOSTResponse(params: CustomerControllerService.UpdateCustomerPhotoUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.customerPhoto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/customer/${params.id}/photo`,
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
   * @param params The `CustomerControllerService.UpdateCustomerPhotoUsingPOSTParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `customerPhoto`: customerPhoto
   */
  updateCustomerPhotoUsingPOST(params: CustomerControllerService.UpdateCustomerPhotoUsingPOSTParams): __Observable<null> {
    return this.updateCustomerPhotoUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CustomerControllerService {

  /**
   * Parameters for getBasicCustomerDtoPageUsingGET
   */
  export interface GetBasicCustomerDtoPageUsingGETParams {

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
   * Parameters for updateCustomerPhotoUsingPOST
   */
  export interface UpdateCustomerPhotoUsingPOSTParams {

    /**
     * id
     */
    id: number;

    /**
     * customerPhoto
     */
    customerPhoto: string;
  }
}

export { CustomerControllerService }
