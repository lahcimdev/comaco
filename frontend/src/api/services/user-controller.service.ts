/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthenticatedUserDto } from '../models/authenticated-user-dto';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly getAuthenticatedUserDtoUsingGETPath = '/api/user';
  static readonly verifyTokenUsingGETPath = '/api/user/verifyToken';

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
  verifyTokenUsingGETResponse(): __Observable<__StrictHttpResponse<{[key: string]: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/user/verifyToken`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: number}>;
      })
    );
  }
  /**
   * @return OK
   */
  verifyTokenUsingGET(): __Observable<{[key: string]: number}> {
    return this.verifyTokenUsingGETResponse().pipe(
      __map(_r => _r.body as {[key: string]: number})
    );
  }
}

module UserControllerService {
}

export { UserControllerService }
