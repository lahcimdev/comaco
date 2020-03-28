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

        let resultInt: number = 0;
        const rolesRequired: string[] = next.data.roles;
        const authenticatedUser = this.store.selectSnapshot(UserState.getauthenticatedUser);

        if (authenticatedUser) {
            rolesRequired.forEach(roleRequired => {
                for (let i = 0; i < authenticatedUser.roles.length; i++) {
                    if (roleRequired == authenticatedUser.roles[i].name) {
                        resultInt++;
                        return
                    }
                }
            })
        }

        if (resultInt != rolesRequired.length) {
            this.router.navigate(["/authorization-error"]);
            return false;
        } else {
            return true;
        }

    }

}