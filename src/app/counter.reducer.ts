import * as Counter from './counter.actions';
import { ActionImplementation } from './common/models/redux.model';

export function counterReducer(state: number = 0, action: ActionImplementation) {
	switch (action.type) {
		case Counter.Increment.type:
			return state + 1;

		case Counter.Decrement.type:
			return state - 1;

		case Counter.Reset.type:
			return 0;

		default:
			return state;
	}
};