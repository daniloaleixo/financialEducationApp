import * as Missions from '../actions/missions.actions';
import { IMission, ActionImplementation } from '../models/barrel-models';

export function missionReducer(state: IMission[] = [],action: ActionImplementation): IMission[] {
	switch (action.type) {
		case Missions.GetMissions.type:
			return action.payload;

		default:
			return state;
	}
}




