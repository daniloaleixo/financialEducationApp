import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IUserMission, AppState, IUser, ParentComponent } from '../shared/models/barrel-models';
import { mission_status, routes_constants } from '../shared/constants/barrel-constants';
import { ChangeHeaderText } from '../shared/actions/barrel-actions';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent extends ParentComponent implements OnInit {

  public userMissions: IUserMission[];

  constructor(private store: Store<AppState>,
              private router: Router) {
    super();
    this.store.dispatch(new ChangeHeaderText(routes_constants.init.header));
    this.userMissions = [];
  }

  ngOnInit() {
  	this.store.select('user')
  		.subscribe((user: IUser) => {
        if(user)
          this.userMissions = user.userMissions
            .filter(mission => mission.status == mission_status.inProgress);
      });
  }

  goToMissions(): void {
    this.router.navigate([routes_constants.viewMissions.path])
  }

  seeDetails(mission: IUserMission) {
    this.router.navigate([routes_constants.missionDetails.path.replace(':idMission', mission.id)]);
  }

}
