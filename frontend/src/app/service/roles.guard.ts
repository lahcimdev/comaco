import { AuthenticatedUserDto } from 'src/api/models';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../state/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class RolesGuard implements CanActivate {

    constructor(public store: Store, public router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let result: boolean = false;
        const rolesRequired: string[] = next.data.roles;
        const authenticatedUser: AuthenticatedUserDto = this.store.selectSnapshot(UserState.getauthenticatedUser);
       
        if (authenticatedUser) {
            authenticatedUser.roles.forEach(roleUser => {
                rolesRequired.forEach(roleRequired => {
                    if (roleUser.name === roleRequired) {
                        result = true;
                    }
                })
            });

        }

        if (!result) {
            this.router.navigate(["/authorization-error"])
        }
        return result;
    }

}