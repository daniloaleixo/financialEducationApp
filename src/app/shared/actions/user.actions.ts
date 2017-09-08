import { ActionImplementation, IUser, IMission } from '../models/barrel-models';

const GET_USER_MISSIONS  = '[User] GetUserMissions';
const ADD_MISSION_USER  = '[User] AddMissionUser';


export class GetUserMissions extends ActionImplementation {
  readonly type = GET_USER_MISSIONS;
  public static type = GET_USER_MISSIONS;

  constructor(public payload: IMission[]) {
  	super(payload);
  }
}

export class AddMissionUser extends ActionImplementation {
  readonly type = ADD_MISSION_USER;
  public static type = ADD_MISSION_USER;

  constructor(public payload: IMission) {
  	super(payload);
  }
}