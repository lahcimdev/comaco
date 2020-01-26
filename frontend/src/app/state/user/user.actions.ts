import { UserModel } from '../models/user.model';

export class UpdateUserStateAction {
  static readonly type = '[User] UpdateUserStateAction';
  constructor(public userModel: UserModel) { }
}

export class LoginAction {
  static readonly type = '[User] LoginAction';
  constructor(public username: string, public password: string) { }
}

export class GetAuthenticatedUserAction {
  static readonly type = '[User] GetAuthenticatedUserAction';
  constructor() { }
}

export class LogoutAction {
  static readonly type = '[User] LogoutAction';
  constructor() { }
}

export class VerifyTokenAction {
  static readonly type = '[User] VerifyTokenAction';
  constructor() { }
}

export class RefreshTokenAction {
  static readonly type = '[User] RefreshTokenAction';
  constructor() { }
}


