import * as User from '../actions/user.actions';
import { IUser, ActionImplementation } from '../models/barrel-models';



export function userReducer(state: IUser = null, action: ActionImplementation): IUser {
	switch (action.type) {
		case User.UpdateUser.type:
			return action.payload;

		case User.AddMissionUser.type:
			state.userMissions.push(action.payload);
			return state;

		default:
			return state;
	}
}