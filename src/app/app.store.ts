import { IAuthUser, IMission } from './shared/models/barrel-models';

export interface AppState {
  auth: IAuthUser;
  missions: IMission[];
}