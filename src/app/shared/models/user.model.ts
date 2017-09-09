import { IMission } from './mission.model';

export interface IUser {
	seeTutorial: boolean;
	userMissions: IUserMission[];
}

export interface IUserMission extends IMission {
	status: string;
}

export function newUser(): IUser {
	return {
		seeTutorial: true,
		userMissions: []
	};
}





export interface DBUser {
	missions: DBUserMissionRelationship[];
}

export interface DBUserMissionRelationship {
	idMission: string;
	status: string;
}