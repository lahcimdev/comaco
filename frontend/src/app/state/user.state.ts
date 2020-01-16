import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoginAction, GetAuthenticatedUserAction, UpdateTokenAction, LogoutAction } from './user.actions';
import { tap, catchError } from 'rxjs/operators';
import { UserControllerService } from 'src/api/services';
import { empty } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';
import { Navigate } from '@ngxs/router-plugin';


export class UserStateModel {

  public token: string;
  public authenticatedUser: AuthenticatedUserDto;

}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: null,
    authenticatedUser: null
  }
})
export class UserState {

  constructor(private httpClient: HttpClient, private userService: UserControllerService) { };

  @Selector()
  static getToken(userStateModel: UserStateModel) {
    return userStateModel.token;
  }

  @Action(LoginAction)
  login(ctx: StateContext<UserStateModel>, {username, password}: LoginAction) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', formData, {}).pipe(
      tap(({ token }) => {
        ctx.patchState({ token: token });
        ctx.dispatch(new GetAuthenticatedUserAction());       
      }),
      catchError((error, caught) => {
        console.log('ERROR LOGINACTION');
        console.log(error.error);
        return empty();
      })
    )
  }

  @Action(GetAuthenticatedUserAction)
  getAuthenticatedUser(ctx: StateContext<UserStateModel>, { } : GetAuthenticatedUserAction) {
    return this.userService.getAuthenticatedUserDtoUsingGET().pipe(
      tap(authenticatedUserDto => {
        ctx.patchState({authenticatedUser: authenticatedUserDto});
        if (authenticatedUserDto.userType === 'EMPLOYEE') {
          ctx.dispatch(new Navigate(['/dashboard-employee']));
        }
        if (authenticatedUserDto.userType === 'CUSTOMER') {
          ctx.dispatch(new Navigate(['/dashboard-customer']));
        }            
      }),
      catchError((error, caught) => {
        console.log('ERROR GETAUTHENTICATEDUSERACTION');
        console.log(error.error);
        return empty();
      })
    );
  }

  @Action(UpdateTokenAction)
  updateToken(ctx: StateContext<UserStateModel>, {token} : UpdateTokenAction) {
    return ctx.patchState({token: token});
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<UserStateModel>, { } : LogoutAction) {
    ctx.patchState({token: null, authenticatedUser: null});
    ctx.dispatch(new Navigate(["/login"]))
  }

}
