import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UserState } from 'src/app/state/user/user.state';
import { AuthenticatedUserDto } from 'src/api/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-employee',
  templateUrl: './navigation-employee.component.html',
  styleUrls: ['./navigation-employee.component.css']
})
export class NavigationEmployeeComponent implements OnInit {

  @Select(state => state.user.authenticatedUser)
  authenticatedUser$: Observable<AuthenticatedUserDto>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  hasRole(role: string): boolean {
    console.log('hasRole()');
    const authenticatedUserDto = this.store.selectSnapshot(UserState.getauthenticatedUser);
    for (let i = 0; i < authenticatedUserDto.roles.length; i++) {
      if(authenticatedUserDto.roles[i].name == role) {
        console.log('OK');
        return true;
      }
    }
    console.log('NOT');
    return false;
  }

}
