import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  IMission,
  IUserMission,
  newUserMission,
  TMissionHash,
  AppState,
  IAddMissionRequest,
  IUser,
  ParentComponent
} from '../../shared/models/barrel-models';
import { communication_constant, mission_status, routes_constants } from '../../shared/constants/barrel-constants';
import { ChangeHeaderText } from '../../shared/actions/barrel-actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { MissionsService } from '../missions.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-view-missions',
  templateUrl: './view-missions.component.html',
  styleUrls: ['./view-missions.component.scss']
})
export class ViewMissionsComponent extends ParentComponent implements OnInit {

  missions: IUserMission[];

  constructor(private store: Store<AppState>,
              private router: Router,
              private toast: ToastService,
  						private missionsService: MissionsService) {
    super();
    this.store.dispatch(new ChangeHeaderText(routes_constants.viewMissions.header));
  }

  ngOnInit() {
    const myUser: Observable<IUser> = this.store.select('user').filter(user => user != null);
    const missions: Observable<TMissionHash> =
      this.store.select('missions').filter(missions => missions != null);

    Observable.combineLatest(myUser, missions).subscribe((res) => {
      const user: IUser = res[0];
      const missionHash: TMissionHash = res[1];
      
      this.missions = 
      Object.keys(missionHash)
        .map(key => missionHash[key])
        .map((mission: IMission) => newUserMission(mission))
        .filter((mission: IUserMission) =>
          user.userMissions.filter(userMission => userMission.id == mission.id).length == 0);

     }, (err) => console.error('bla', err));
  }

  addMission(mission: IUserMission): void {
  	this.missionsService.addMission(<IAddMissionRequest>{
  		idMission: mission.id,
  		requestType: communication_constant.addMission
  	})
  	.then(res => {
      // Also set this mission as unclickable
      mission.status = mission_status.inProgress;
      this.toast.openSnackBar(res, '')
    })
    .catch(err => this.toast.openSnackBar(err, ''));
  }

  userAlreadyInMission(mission): boolean {
    return true;
  }


  seeDetails(mission: IUserMission) {
    this.router.navigate([routes_constants.missionDetails.path.replace(':idMission', mission.id)]);
  }

}
