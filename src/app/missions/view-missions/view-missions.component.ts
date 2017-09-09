import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IMission, TMissionHash, AppState, IAddMissionRequest } from '../../shared/models/barrel-models';
import { communication_constant } from '../../shared/constants/communication.constant';

import { Observable } from 'rxjs/Observable';

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
  	this.store.select('missions').subscribe((missionHash: TMissionHash) => 
       this.missions = Object.keys(missionHash).map(key => missionHash[key]));
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
