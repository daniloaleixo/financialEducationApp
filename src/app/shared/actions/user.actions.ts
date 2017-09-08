import { ActionImplementation, IUser, IMission } from '../models/barrel-models';

const GET_USER_MISSIONS  = '[User] GetUserMissions';


export class GetUserMissions extends ActionImplementation {
  readonly type = GET_USER_MISSIONS;
  public static type = GET_USER_MISSIONS;

  constructor(public payload: IMission[]) {
  	super(payload);
  }
}