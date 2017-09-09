import { ActionImplementation, IMission, TMissionHash } from '../models/barrel-models';

const GET_MISSIONS  = '[Missions] GetMissions';


export class GetMissions extends ActionImplementation {
  readonly type = GET_MISSIONS;
  public static type = GET_MISSIONS;

  constructor(public payload: TMissionHash) {
  	super(payload);
  }
}
