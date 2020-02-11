import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoginAction, GetAuthenticatedUserAction, LogoutAction, UpdateUserStateAction, VerifyTokenAction, RefreshTokenAction, GetAllRolesAction, GetTokenExpirationTimeAction } from './user.actions';
import { tap, catchError } from 'rxjs/operators';
import { UserControllerService } from 'src/api/services';
import { empty } from 'rxjs';
import { AuthenticatedUserDto, Role } from 'src/api/models';
import { Navigate } from '@ngxs/router-plugin';
import Cookies from 'js-cookie'


export class UserStateModel {

  public token: string;
  public tokenExpirationTime: number;
  public authenticatedUser: AuthenticatedUserDto;
  public errorMessage: string;

  public roles: Array<Role>;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: null,
    tokenExpirationTime: null,
    authenticatedUser: null,
    errorMessage: null,

    roles: null,
  }
})
export class UserState {

  constructor(private httpClient: HttpClient, private userService: UserControllerService) { };

  @Selector()
  static getToken(userStateModel: UserStateModel) {
    return userStateModel.token;
  }

  @Selector()
  static getauthenticatedUser(userStateModel: UserStateModel) {
    return userStateModel.authenticatedUser;
  }

  @Action(LoginAction)
  login(ctx: StateContext<UserStateModel>, { username, password }: LoginAction) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', formData, {}).pipe(
      tap(({ token }) => {
        ctx.patchState({ token: token });
        Cookies.set('token', token, { expires: 7 })
        ctx.dispatch(new GetAuthenticatedUserAction());
      }),
      catchError((error, caught) => {
        console.log('ERROR LOGINACTION');
        console.log(error.error);
        ctx.patchState({ errorMessage: 'login.errorMessages.incorecsUsernamePassword' });
        return empty();
      })
    )
  }

  @Action(GetAuthenticatedUserAction)
  getAuthenticatedUser(ctx: StateContext<UserStateModel>, { }: GetAuthenticatedUserAction) {
    return this.userService.getAuthenticatedUserDtoUsingGET().pipe(
      tap(authenticatedUserDto => {
        ctx.patchState({ authenticatedUser: authenticatedUserDto });
        if (authenticatedUserDto.userType === 'EMPLOYEE') {
          ctx.dispatch(new Navigate(['/dashboard-employee']));
        }
        if (authenticatedUserDto.userType === 'CUSTOMER') {
          ctx.dispatch(new Navigate(['/dashboard-customer']));
        }
      }),
      catchError((error, caught) => {
        console.log('ERROR IN GETAUTHENTICATEDUSERACTION');
        console.log(error.error);
        return empty();
      })
    );
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<UserStateModel>, { }: LogoutAction) {
    ctx.patchState({ token: null, authenticatedUser: null });
    ctx.dispatch(new Navigate(["/login"]))
    Cookies.remove('token');
  }

  @Action(VerifyTokenAction)
  verifyToken(ctx: StateContext<UserStateModel>, { }: VerifyTokenAction) {
      ctx.patchState({ token: Cookies.get('token') });
    return this.userService.verifyTokenUsingGET().pipe(
      tap(() => {
        ctx.dispatch(new GetAuthenticatedUserAction());
      }),
      catchError((error, caught) => {
        ctx.dispatch(new Navigate(["/login"]))
        ctx.patchState({ token: null });
        Cookies.remove('token');
        console.log('ERROR IN VerifyTokenAction');
        console.log(error.error);
        return empty();
      })
    )
  }

  @Action(RefreshTokenAction)
  refreshToken(ctx: StateContext<UserStateModel>, { }: RefreshTokenAction) {
    return this.userService.verifyTokenUsingGET().pipe(
      catchError((error, caught) => {
        ctx.dispatch(new Navigate(["/login"]))
        ctx.patchState({ token: null });
        console.log('ERROR IN RefreshTokenAction');
        console.log(error.error);
        return empty();
      })
    )
  }

  @Action(UpdateUserStateAction)
  updateUserState(ctx: StateContext<UserStateModel>, { userModel }: UpdateUserStateAction) {
    ctx.patchState({
      token: userModel.token ? userModel.token : ctx.getState().token,
      authenticatedUser: userModel.authenticatedUser ? userModel.authenticatedUser : ctx.getState().authenticatedUser,
      errorMessage: userModel.errorMessage ? userModel.errorMessage : ctx.getState().errorMessage
    });
  }

  @Action(GetAllRolesAction)
  getAllRoles(ctx: StateContext<UserStateModel>, { }: GetAllRolesAction) {
    return this.userService.getAllRolesUsingGET().pipe(
      tap(roles => {
        ctx.patchState({ roles: roles });
      })
    )
  }

  @Action(GetTokenExpirationTimeAction)
  getTokenExpirationTime(ctx: StateContext<UserStateModel>, { }: GetTokenExpirationTimeAction) {
    return this.userService.getTokenExpirationTimeUsingGET().pipe(
      tap(tokenExpitarionTime => {
        ctx.patchState({tokenExpirationTime: tokenExpitarionTime})
      }),
      catchError((error, caught) => {
        console.log('ERROR IN GetTokenExpirationTimeAction');
        console.log(error.error);
        return empty();
      })
    )
  }

}
