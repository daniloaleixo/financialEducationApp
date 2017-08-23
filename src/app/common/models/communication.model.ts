import { IAuthUser } from './user.model';

export type TRequest = number;

export interface IRequest {
	requestType: TRequest;
}
export interface IResponse {

}


export interface ILoginRequest extends IRequest {
	email: string;
	password: string;
}

export interface ILoginResponse extends IResponse {
	user: IAuthUser;
}

