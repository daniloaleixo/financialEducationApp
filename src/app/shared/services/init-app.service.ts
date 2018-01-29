import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ServerCommunicationService } from './server-communication.service';
import { communication_constant } from '../constants/communication.constant';

import { IInitResponse, AppState, IMission } from '../models/barrel-models';
import { routes_constants } from '../constants/barrel-constants';

import { GetMissions, UpdateUser } from '../actions/barrel-actions';

@Injectable()
export class InitAppService {

  constructor(private server: ServerCommunicationService,
              private router: Router,
  						private store: Store<AppState>) {
    this.initSystem();
  }

  public initSystem(): void {
  	// Get all the missions and put it in the store
  	this.server.request({requestType: communication_constant.init})
  		.then((response: IInitResponse) => {
  			// Put all the missions in the store
			  this.store.dispatch(new GetMissions(response.missions))

			  this.store.dispatch(new UpdateUser(response.user));

        console.log('aqui - user', response.user);
        if(response.user && response.user.firstTime) this.router.navigate([routes_constants.firstTime.path]);
  		});
  }

}
