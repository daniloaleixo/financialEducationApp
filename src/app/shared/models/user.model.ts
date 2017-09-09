import { IMission } from './mission.model';
import { mission_status } from '../constants/barrel-constants';

export interface IUser {
	seeTutorial: boolean;
	userMissions: IUserMission[];
}

export interface IUserMission extends IMission {
	status: string;
	progress: number;
}

export function newUser(): IUser {
	return {
		seeTutorial: true,
		userMissions: []
	};
}

export function newUserMission(mission: IMission): IUserMission {
	return {
		...mission,
		status: mission_status.toDo,
		progress: 0
	}
}





export interface DBUser {
	missions: DBUserMissionRelationship[];
}

export interface DBUserMissionRelationship {
	idMission: string;
	status: string;
	progress: number;
}