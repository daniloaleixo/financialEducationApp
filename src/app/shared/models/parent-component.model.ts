import { routes_constants, mission_status } from '../constants/barrel-constants';

export class ParentComponent {
	public routes_constants = routes_constants;
	public mission_status = mission_status;

	public errorMessage: string;

	constructor() {}
}