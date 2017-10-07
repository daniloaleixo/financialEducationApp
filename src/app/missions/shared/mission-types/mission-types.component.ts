import { Component, OnInit, Input } from '@angular/core';

import { IUserMission, ParentComponent } from '../../../shared/models/barrel-models';

@Component({
  selector: 'app-mission-types',
  templateUrl: './mission-types.component.html',
  styleUrls: ['./mission-types.component.scss']
})
export class MissionTypesComponent extends ParentComponent implements OnInit {

	@Input() mission: IUserMission;

  constructor() {
  	super();
  }

  ngOnInit() {
  }

}
