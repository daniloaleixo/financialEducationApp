import {
	routes_constants,
	mission_status,
	mission_types
} from '../constants/barrel-constants';

import { TRole } from '../types/barrel-types';

export class ParentComponent {
	public routes_constants = routes_constants;
	public mission_status = mission_status;
	public mission_types = mission_types;

	public errorMessage: string;

	public TRole = TRole;

	constructor() {}
}