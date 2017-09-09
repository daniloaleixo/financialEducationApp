import { IAuthUser, TMissionHash, IUser } from './shared/models/barrel-models';

export interface AppState {
  auth: IAuthUser;
  missions: TMissionHash;
  user: IUser;
}