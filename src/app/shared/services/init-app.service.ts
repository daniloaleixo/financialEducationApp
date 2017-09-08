import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ServerCommunicationService } from './server-communication.service';
import { communication_constant } from '../constants/communication.constant';

import { IInitResponse, AppState, IMission } from '../models/barrel-models';

import { GetMissions, GetUserMissions } from '../actions/barrel-actions';

@Injectable()
export class InitAppService {

  constructor(private server: ServerCommunicationService,
  						private store: Store<AppState>) {
  	// Get all the missions and put it in the store
  	this.server.request({requestType: communication_constant.init})
  		.then((response: IInitResponse) => {
  			// Put all the missions in the store
			  this.store.dispatch(new GetMissions(response.missions))

			  const userMissions: IMission[] = response.missions
			  	.filter(mission => response.userMissions.indexOf(mission.id) != -1);

			  this.store.dispatch(new GetUserMissions(userMissions));
  		});
  }

}
