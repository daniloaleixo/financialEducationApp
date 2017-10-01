import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUser, IFinishFirstTimeRequest, AppState } from '../shared/models/barrel-models';
import { UpdateUser } from '../shared/actions/barrel-actions';
import { communication_constant } from '../shared/constants/barrel-constants';
import { ServerCommunicationService } from '../shared/services/server-communication.service';

@Injectable()
export class TutorialService {

  constructor(private server: ServerCommunicationService,
  						private store: Store<AppState>) { }

  public finishFirstTime(user: IUser): Promise<IUser> {
  	user.firstTime = false;
  	const req: IFinishFirstTimeRequest = {
  		user: user,
  		requestType: communication_constant.finishFirstTime
  	};
  	return new Promise<IUser>((resolve, reject) => {
	  	this.server.request(req)
	  	.then(res => {
	  		this.store.dispatch(new UpdateUser(user));
	  		resolve(user);
	  	})
	  	.catch((err) => reject(err));
  	});

  }

}
