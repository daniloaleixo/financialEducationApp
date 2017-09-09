import * as Missions from '../actions/missions.actions';
import { IMission, TMissionHash, ActionImplementation } from '../models/barrel-models';

export function missionReducer(state: TMissionHash = {}, action: ActionImplementation): TMissionHash {
	switch (action.type) {
		case Missions.GetMissions.type:
			return action.payload;

		default:
			return state;
	}
}




