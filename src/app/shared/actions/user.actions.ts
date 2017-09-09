import { ActionImplementation, IUser, IUserMission } from '../models/barrel-models';

const UPDATE_USER  = '[User] UpdateUser';
const ADD_MISSION_USER  = '[User] AddMissionUser';


export class UpdateUser extends ActionImplementation {
  readonly type = UPDATE_USER;
  public static type = UPDATE_USER;

  constructor(public payload: IUser) {
  	super(payload);
  }
}

export class AddMissionUser extends ActionImplementation {
  readonly type = ADD_MISSION_USER;
  public static type = ADD_MISSION_USER;

  constructor(public payload: IUserMission) {
    super(payload);
  }
}