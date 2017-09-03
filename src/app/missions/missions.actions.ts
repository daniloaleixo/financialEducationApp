import { ActionImplementation, IMission } from '../shared/models/barrel-models';

const GET_MISSIONS  = '[Missions] GetMissions';


export class GetMissions extends ActionImplementation {
  readonly type = GET_MISSIONS;
  public static type = GET_MISSIONS;

  constructor(public payload: IMission[]) {
  	super(payload);
  }
}
