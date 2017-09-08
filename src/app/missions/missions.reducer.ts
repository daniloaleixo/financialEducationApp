import * as Missions from './missions.actions';
import { IMission, ActionImplementation } from '../shared/models/barrel-models';

export function missionReducer(state: IMission[] = [],action: ActionImplementation): IMission[] {
	switch (action.type) {
		case Missions.GetMissions.type:
			return action.payload;

		default:
			return state;
	}
}




