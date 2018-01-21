import { IMission } from './mission.model';
import { mission_status, CHILD } from '../constants/barrel-constants';
import { TRole, TGenre, TAllowanceFrequence } from '../types/barrel-types';

export interface IUser {
	name: string;
	authID: string;
	role: TRole;
	firstTime: boolean;
	userMissions: IUserMission[];
	birthDate: Date;
	receiveAllowance: boolean;
	frequence: TAllowanceFrequence;
	amount: number;
	experience: number;
	level: number;
	genre: TGenre;
}

export interface IUserMission extends IMission {
	status: string;
	progress: number;
}

export interface IUserDomesticShoreMission extends IUserMission {
	domesticShore: string;
	provePhoto: string;
}

export function newUser(name: string, authID: string): IUser {
	return {
		name: name,
		authID: authID,
		role: TRole.CHILD,
		firstTime: true,
		userMissions: [],
		birthDate: new Date(),
		receiveAllowance: false,
		frequence: TAllowanceFrequence.WEEKLY,
		amount: 0,
		experience: 0,
		level: 1,
		genre: TGenre.MALE
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