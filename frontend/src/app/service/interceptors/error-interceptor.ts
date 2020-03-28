import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public store: Store) { };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error, caught) => {
                const errorStatus = error.error.status;
                if (errorStatus === 401 && error.error.path === '/login') {
                    console.log('401 - przerzucam dalej');
                    return throwError(error);
                }
                if (errorStatus === 500) {
                    this.store.dispatch(new Navigate(['server-error']));
                    console.log('INTERCEPTOR ERROR with status:' + error.error.status);
                    console.log(error.error);
                    return empty();
                }
            })
        )



    }



}