import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, Select } from '@ngxs/store';
import { LogoutAction } from 'src/app/state/user.actions';
import { Observable } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService, private store: Store) { }

  @Select(state => state.user.authenticatedUser)
  authenticatedUser$: Observable<AuthenticatedUserDto>;

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
