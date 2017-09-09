import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  IAddMissionRequest,
  IAddMissionResponse,
  IUserMission,
  AppState,
  IMission,
  TMissionHash
} from '../shared/models/barrel-models';
import { AddMissionUser } from '../shared/actions/barrel-actions';
import { sucessMessages, errorMessages } from '../shared/constants/barrel-constants';

import { ServerCommunicationService } from '../shared/services/server-communication.service';

@Injectable()
export class MissionsService {

  constructor(private server: ServerCommunicationService,
  						private store: Store<AppState>) { }

  addMission(request: IAddMissionRequest): Promise<string> {
  	return new Promise<string>((resolve, reject) => {
  		this.server.request(request).then((response: IAddMissionResponse) => {
  			// Add mission to user missions
  			this.store.select('missions').subscribe((missions: TMissionHash) => {
  				const myMission: IUserMission = {
            status: response.userMission.status,
            progress: response.userMission.progress,
            ...missions[response.userMission.id]
          };
  				this.store.dispatch(new AddMissionUser(myMission));
  			});
  			resolve(sucessMessages.addMissionSucess);
  		})
  		.catch(err => {
        console.error(err);
        reject(errorMessages.addMissionError)
      });
  	})
  }

}
