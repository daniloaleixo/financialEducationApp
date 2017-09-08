import { IAuthUser, IMission, IUser } from './shared/models/barrel-models';

export interface AppState {
  auth: IAuthUser;
  missions: IMission[];
  user: IUser;
}