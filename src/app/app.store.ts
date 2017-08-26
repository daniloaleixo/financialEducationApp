import { IAuthUser } from './auth/auth.model';

export interface AppState {
  counter: number;
  auth: IAuthUser;
}