import * as Auth from './auth.actions';
import { IAuthUser, ActionImplementation } from '../common/models/barrel-models';

export function authReducer(state: IAuthUser = null, action: ActionImplementation) {
	switch (action.type) {
		case Auth.AuthChange.type:
			console.log('vamo ver', action.payload);
			return action.payload;

		default:
			return state;
	}
}