import { Action } from '@ngrx/store';

export class ActionImplementation implements Action {
	readonly type = null;
	public static type = null;

	constructor(public payload: any = null) {}
}
