import { IAuthUser } from './common/models/auth.model';

export interface AppState {
  counter: number;
  auth: IAuthUser;
}