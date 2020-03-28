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

export class GetAllRolesAction {
  static readonly type = '[User] GetAllRolesAction';
  constructor() { }
}

export class GetTokenExpirationTimeAction {
  static readonly type = '[User] GetTokenExpirationTimeAction';
  constructor() { }
}

// UserStateSetters
export class SetTokenAction {
  static readonly type = '[User] SetTokenAction';
  constructor(public token: string) { }
}
export class SetErrorMessageAction {
  static readonly type = '[User] SetErrorMessageAction';
  constructor(public errorMessage: string) { }
}
