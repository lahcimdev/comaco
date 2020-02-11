import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/state/user/user.state';
import { UpdateUserStateAction } from 'src/app/state/user/user.actions';
import Cookies from 'js-cookie'



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public store: Store) { };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(UserState.getToken);
        if (token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }

        return next.handle(request).pipe(map(httpEvent => {
            if (httpEvent instanceof HttpResponse && httpEvent.headers.get('Authorization')) {
                const newToken = httpEvent.headers.get('Authorization');
                this.store.dispatch(new UpdateUserStateAction({ token: newToken }));
                Cookies.set('token', newToken, { expires: 7 })
            }
            return httpEvent;
        }));



    }





}