import * as User from '../actions/user.actions';
import { IUser, IUserMission, ActionImplementation, DBUserMissionRelationship } from '../models/barrel-models';



export function userReducer(state: IUser = null, action: ActionImplementation): IUser {
	switch (action.type) {
		case User.UpdateUser.type:
			return <IUser>action.payload;

		case User.AddMissionUser.type:
			state.userMissions.push(<IUserMission>action.payload);
			return state;

		case User.UpdateMissionUser.type:
			const payload: IUserMission = <IUserMission>action.payload;
			state.userMissions.map(mission => {
				if (mission.id == payload.id) mission = payload;
			});
			// Gambs
			if(state['missions']) {
				const mission: DBUserMissionRelationship = state['missions']
				.find((mission: DBUserMissionRelationship) => mission.idMission == payload.id);
				mission.progress = payload.progress;
			}
			return state;

		default:
			return state;
	}
}