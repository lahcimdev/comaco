export class LoginAction {
  static readonly type = '[User] LoginAction';
  constructor(public username: string, public password: string) { }
}

export class GetAuthenticatedUserAction {
  static readonly type = '[User] GetAuthenticatedUserAction';
  constructor() { }
}

export class UpdateTokenAction {
  static readonly type = '[User] UpdateTokenAction';
  constructor(public token: string) { }
}

export class LogoutAction {
  static readonly type = '[User] LogoutAction';
  constructor() { }
}

