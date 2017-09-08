import * as User from './user.actions';
import { IUser, ActionImplementation } from '../shared/models/barrel-models';



export function userReducer(state: IUser = null, action: ActionImplementation): IUser {
	switch (action.type) {
		case User.GetUserMissions.type:
			return { userMissions: action.payload, ...state };

		default:
			return state;
	}
}