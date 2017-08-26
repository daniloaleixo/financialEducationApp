import { ActionImplementation } from '../common/models/redux.model';
import { IAuthUser } from '../common/models/auth.model';

const AUTH_CHANGE  = '[Auth] AuthChange';


export class AuthChange extends ActionImplementation {
  readonly type = AUTH_CHANGE;
  public static type = AUTH_CHANGE;

  constructor(public payload: IAuthUser) {
  	super(payload);
  }
}
