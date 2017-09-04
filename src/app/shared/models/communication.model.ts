import { IAuthUser } from './auth.model';
import { IMission } from './mission.model';

export type TRequest = number;

export interface IRequest {
	requestType: TRequest;
}

export interface ILoginRequest extends IRequest {
	email: string;
	password: string;
}

export interface IAddMissionRequest extends IRequest {
	idMission: string;
}



export interface IResponse {

}

export interface ILoginResponse extends IResponse {
	user: IAuthUser;
}

export interface IInitResponse extends IResponse {
	missions: IMission[];
	userMissions: string[];
}
