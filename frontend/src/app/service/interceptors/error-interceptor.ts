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
                console.log(error);
                const errorStatus = error.error.status;
                if (errorStatus === 401 && error.error.path === '/login') {
                    console.log('401 - przerzucam dalej');
                    console.log(error);
                    return throwError(error);
                } else {
                    console.log('INTERCEPTOR ERROR with status:' + error.error.status);
                    console.log(error.error);
                    this.store.dispatch(new Navigate(["/login"]));
                    return empty();
                }
            })
        )



    }



}