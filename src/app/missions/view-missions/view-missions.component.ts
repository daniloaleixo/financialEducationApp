import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IMission, TMissionHash, AppState, IAddMissionRequest, IUser } from '../../shared/models/barrel-models';
import { communication_constant } from '../../shared/constants/communication.constant';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of'

import { MissionsService } from '../missions.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-view-missions',
  templateUrl: './view-missions.component.html',
  styleUrls: ['./view-missions.component.scss']
})
export class ViewMissionsComponent implements OnInit {

  missions: IMission[];

  constructor(private store: Store<AppState>,
              private toast: ToastService,
  						private missionsService: MissionsService) { }

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
        .filter((mission: IMission) => {
          if(user.userMissions)
            return user.userMissions.filter(userMission => userMission.id == mission.id).length == 0;
          else return false;
        });

     }, (err) => console.error('bla', err));
  }

  addMission(mission: IMission): void {
  	this.missionsService.addMission(<IAddMissionRequest>{
  		idMission: mission.id,
  		requestType: communication_constant.addMission
  	})
  	.then(res => this.toast.openSnackBar(res, ''))
    .catch(err => this.toast.openSnackBar(err, ''));
  }

  userAlreadyInMission(mission): boolean {
    return true;
  }

}
