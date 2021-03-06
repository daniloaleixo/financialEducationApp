import { IAuthUser } from './auth.model';
import { IMission, TMissionHash } from './mission.model';
import { IUser, IUserMission } from './user.model';

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

export interface IUpdateMissionRequest extends IRequest {
	user: IUser;
}

export interface IFinishFirstTimeRequest extends IRequest {
	user: IUser;
}

export interface IGetChildrenRequest extends IRequest {
	authIDs: string[];
}




export interface IResponse {

}

export interface ILoginResponse extends IResponse {
	authUser: IAuthUser;
	user: IUser;
}

export interface IInitResponse extends IResponse {
	missions: TMissionHash;
	user: IUser;
}

export interface IAddMissionResponse extends IResponse {
	userMission: IUserMission;
}

export interface IGetChildrenResponse extends IResponse {
	children: IUser[];
}
