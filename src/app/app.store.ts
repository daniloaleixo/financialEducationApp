import { IAuthUser, TMissionHash, IUser, ILayout } from './shared/models/barrel-models';

export interface AppState {
  auth: IAuthUser;
  missions: TMissionHash;
  user: IUser;
  layout: ILayout;
}