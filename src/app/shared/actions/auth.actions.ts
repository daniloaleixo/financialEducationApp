import { ActionImplementation } from '../models/redux.model';
import { IAuthUser } from '../models/auth.model';

const AUTH_CHANGE  = '[Auth] AuthChange';
const LOGOUT = '[Auth] LOGOUT';


export class AuthChange extends ActionImplementation {
  readonly type = AUTH_CHANGE;
  public static type = AUTH_CHANGE;

  constructor(public payload: IAuthUser) {
  	super(payload);
  }
}

export class Logout extends ActionImplementation {
  readonly type = LOGOUT;
  public static type = LOGOUT;

  constructor() {
  	super();
  }
}
