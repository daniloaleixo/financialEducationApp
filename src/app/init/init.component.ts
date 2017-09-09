import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IUserMission, AppState, IUser, ParentComponent } from '../shared/models/barrel-models';
import { mission_status } from '../shared/constants/barrel-constants';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent extends ParentComponent implements OnInit {

  public userMissions: IUserMission[];

  constructor(private store: Store<AppState>, private router: Router) {
    super();
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
    this.router.navigate([this.routes_constants.viewMissions.path])
  }

}
