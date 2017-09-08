import * as User from '../actions/user.actions';
import { IUser, ActionImplementation } from '../models/barrel-models';



export function userReducer(state: IUser = null, action: ActionImplementation): IUser {
	switch (action.type) {
		case User.GetUserMissions.type:
			return { userMissions: action.payload, ...state };

		default:
			return state;
	}
}