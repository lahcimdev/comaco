/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthenticatedUserDto } from '../models/authenticated-user-dto';
import { Role } from '../models/role';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly getAuthenticatedUserDtoUsingGETPath = '/api/user';
  static readonly getAllRolesUsingGETPath = '/api/user/roles';
  static readonly getTokenExpirationTimeUsingGETPath = '/api/user/token-expiration-time';
  static readonly verifyTokenUsingGETPath = '/api/user/verify-token';
  static readonly deleteUserUsingDELETEPath = '/api/user/{id}/delete';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getAuthenticatedUserDtoUsingGETResponse(): __Observable<__StrictHttpResponse<AuthenticatedUserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthenticatedUserDto>;
      })
    );
  }
  /**
   * @return OK
   */
  getAuthenticatedUserDtoUsingGET(): __Observable<AuthenticatedUserDto> {
    return this.getAuthenticatedUserDtoUsingGETResponse().pipe(
      __map(_r => _r.body as AuthenticatedUserDto)
    );
  }

  /**
   * @return OK
   */
  getAllRolesUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Role>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user/roles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Role>>;
      })
    );
  }
  /**
   * @return OK
   */
  getAllRolesUsingGET(): __Observable<Array<Role>> {
    return this.getAllRolesUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Role>)
    );
  }

  /**
   * @return OK
   */
  getTokenExpirationTimeUsingGETResponse(): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user/token-expiration-time`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * @return OK
   */
  getTokenExpirationTimeUsingGET(): __Observable<number> {
    return this.getTokenExpirationTimeUsingGETResponse().pipe(
      __map(_r => _r.body as number)
    );
  }
  verifyTokenUsingGETResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user/verify-token`,
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
  }  verifyTokenUsingGET(): __Observable<null> {
    return this.verifyTokenUsingGETResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id id
   */
  deleteUserUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/user/${id}/delete`,
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
   * @param id id
   */
  deleteUserUsingDELETE(id: number): __Observable<null> {
    return this.deleteUserUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UserControllerService {
}

export { UserControllerService }
