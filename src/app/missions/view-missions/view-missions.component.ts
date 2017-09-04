import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IMission, AppState, IAddMissionRequest } from '../../shared/models/barrel-models';
import { communication_constant } from '../../shared/constants/communication.constant';

import { Observable } from 'rxjs/Observable';

import { ServerCommunicationService } from '../../shared/services/server-communication.service';

@Component({
  selector: 'app-view-missions',
  templateUrl: './view-missions.component.html',
  styleUrls: ['./view-missions.component.scss']
})
export class ViewMissionsComponent implements OnInit {

	missions: Observable<IMission[]>;

  constructor(private store: Store<AppState>,
  						private server: ServerCommunicationService) { }

  ngOnInit() {
  	this.missions = this.store.select('missions');
  }

  addMission(mission: IMission): void {
  	this.server.request(<IAddMissionRequest>{
  		idMission: mission.id,
  		requestType: communication_constant.addMission
  	})
  	.then(res => console.log(res));
  }

  userAlreadyInMission(mission): boolean {
    
  }

}
