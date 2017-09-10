import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
	AppState,
	TMissionHash,
	IMission,
	IUserMission,
	IUser,
	ParentComponent
} from '../../shared/models/barrel-models';
import { ChangeHeaderText } from '../../shared/actions/barrel-actions';
import { routes_constants } from '../../shared/constants/barrel-constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';



@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent extends ParentComponent implements OnInit {

	public mission: IMission | IUserMission;
	public isUserMission = false; 

  constructor(private route: ActivatedRoute,
  						private store: Store<AppState>) {
  	super();
  	this.store.dispatch(new ChangeHeaderText(routes_constants.missionDetails.header));

  	Observable.combineLatest(
  		this.route.params,
  		this.store.select('missions').filter(missions => missions != null),
  		this.store.select('user').filter(user => user != null))
  	.subscribe((res) => {
  	  const idMission: string = res[0]['idMission'];
  	  const missionHash: TMissionHash = res[1];
  	  const user: IUser = res[2];

  	  const userMissions: IUserMission[] = user.userMissions
  	  	.filter((mission: IUserMission) => idMission == mission.id)

  	  // If the user has this mission
  	  if(userMissions.length > 0) {
  	  	this.mission = userMissions.pop();
  	  	this.isUserMission = true;
  	  }
  	  // Otherwise I get from the hash
  	  else this.mission = missionHash[idMission];
  	},
  	error => console.error('Erro ao tentar fazer o subscription'));
  }

  ngOnInit() {
  }

}
