import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoginAction, GetAuthenticatedUserAction, LogoutAction, UpdateUserStateAction, VerifyTokenAction, RefreshTokenAction } from './user.actions';
import { tap, catchError } from 'rxjs/operators';
import { UserControllerService } from 'src/api/services';
import { empty } from 'rxjs';
import { AuthenticatedUserDto } from 'src/api/models';
import { Navigate } from '@ngxs/router-plugin';
import Cookies from 'js-cookie'


export class UserStateModel {

  public token: string;
  public tokenExpirtaionTime: number;
  public authenticatedUser: AuthenticatedUserDto;
  public errorMessage: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: null,
    tokenExpirtaionTime: null,
    authenticatedUser: null,
    errorMessage: null
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
    return this.httpClient.post<{ token: string, expirationTime: number }>('http://localhost:8080/login', formData, {}).pipe(
      tap(({ token, expirationTime }) => {
        ctx.patchState({ token: token, tokenExpirtaionTime: expirationTime / 60000 });
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
    ctx.patchState({ token: null, tokenExpirtaionTime: null, authenticatedUser: null });
    ctx.dispatch(new Navigate(["/login"]))
    Cookies.remove('token');
  }

  @Action(VerifyTokenAction)
  verifyToken(ctx: StateContext<UserStateModel>, { }: VerifyTokenAction) {
      ctx.patchState({ token: Cookies.get('token') });
    return this.userService.verifyTokenUsingGET().pipe(
      tap((expirationTime) => {
        ctx.patchState({ tokenExpirtaionTime: expirationTime['expirationTime'].valueOf() / 60000 });
        ctx.dispatch(new GetAuthenticatedUserAction());
      }),
      catchError((error, caught) => {
        ctx.dispatch(new Navigate(["/login"]))
        ctx.patchState({ token: null });
          Cookies.remove('token');
        console.log('ERROR IN VERIFYTOKENACTION');
        console.log(error.error);
        return empty();
      })
    )
  }

  @Action(RefreshTokenAction)
  refreshToken(ctx: StateContext<UserStateModel>, { }: RefreshTokenAction) {
    return this.userService.verifyTokenUsingGET().pipe(
      tap((expirationTime) => {
        ctx.patchState({ tokenExpirtaionTime: expirationTime['expirationTime'].valueOf() / 60000 });
      }),
      catchError((error, caught) => {
        ctx.dispatch(new Navigate(["/login"]))
        ctx.patchState({ token: null });
        console.log('ERROR IN REFRESHYTOKENACTION');
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

}
