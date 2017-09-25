import { IMission } from './mission.model';
import { mission_status } from '../constants/barrel-constants';

export type TAllowanceFrequence = 'W' | 'M';

export interface IUser {
	firstTime: boolean;
	userMissions: IUserMission[];
	birthDate: Date;
	receiveAllowance: boolean;
	frequence: TAllowanceFrequence;
	amount: number;
	experience: number;
	level: number;
}

export interface IUserMission extends IMission {
	status: string;
	progress: number;
}

export function newUser(): IUser {
	return {
		firstTime: true,
		userMissions: [],
		birthDate: new Date(),
		receiveAllowance: false,
		frequence: 'W',
		amount: 0,
		experience: 0,
		level: 0
	};
}

export function newUserMission(mission: IMission): IUserMission {
	return {
		...mission,
		status: mission_status.toDo,
		progress: 0
	}
}

export function userAge(user: IUser): number {
    const today: Date = new Date();
    const birthDate: Date = user.birthDate;
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}





export interface DBUser {
	missions: DBUserMissionRelationship[];
}

export interface DBUserMissionRelationship {
	idMission: string;
	status: string;
	progress: number;
}