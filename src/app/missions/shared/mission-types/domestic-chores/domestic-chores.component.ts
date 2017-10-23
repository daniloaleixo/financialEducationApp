import { Component, OnInit, Input } from '@angular/core';

import { IUserDomesticShoreMission } from '../../../../shared/models/barrel-models';
import { mission_status, communication_constant } from '../../../../shared/constants/barrel-constants';
import { ToastService } from '../../../../shared/services/toast.service';
import { MissionsService } from '../../../missions.service';

@Component({
  selector: 'app-domestic-chores',
  templateUrl: './domestic-chores.component.html',
  styleUrls: ['./domestic-chores.component.scss']
})
export class DomesticChoresComponent implements OnInit {

	@Input() mission: IUserDomesticShoreMission;
	public checked = false;

  constructor(private missionsService: MissionsService,
  						private toast: ToastService) {
  }

  ngOnInit() {
  	this.checked = this.mission.status == mission_status.completed;
  }

  update(): void {
  	if (this.checked) this.mission.status = mission_status.completed;
  	this.missionsService.updateMission(this.mission)
  	.then((message) => this.toast.openSnackBar(message, ''))
  	.catch((message) => this.toast.openSnackBar(message, ''));

  }

}
