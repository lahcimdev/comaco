import { UserState } from 'src/app/state/user/user.state';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, Select } from '@ngxs/store';
import { LogoutAction, VerifyTokenAction, RefreshTokenAction } from 'src/app/state/user/user.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';
import { CountdownConfig, CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  private tokenCountdown: CountdownConfig;
  private tokenSubscription: Subscription;

  constructor(private translateService: TranslateService, private store: Store) { }

  @Select(state => state.user.authenticatedUser)
  authenticatedUser$: Observable<AuthenticatedUserDto>;

  @Select(state => state.user.token)
  token$: Observable<string>;

  ngOnInit() {
    this.tokenCountdown = {
      format: 'm:ss',
      leftTime: 10*60
    }
    this.tokenSubscription = this.token$.subscribe(token => {
      if (this.countdown) {
        this.countdown.restart();
      }
    })
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  refreshToken() {
    this.store.dispatch(new RefreshTokenAction());
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }


}
