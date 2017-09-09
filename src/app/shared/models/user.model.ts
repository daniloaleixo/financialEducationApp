import { IMission } from './mission.model';

export interface IUser {
	seeTutorial: boolean;
	userMissions: IMission[];
}


export function newUser(): IUser {
	return {
		seeTutorial: true,
		userMissions: []
	};
}