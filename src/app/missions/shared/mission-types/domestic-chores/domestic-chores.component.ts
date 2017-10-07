import { Component, OnInit, Input } from '@angular/core';

import { IUserMission } from '../../../../shared/models/barrel-models';

@Component({
  selector: 'app-domestic-chores',
  templateUrl: './domestic-chores.component.html',
  styleUrls: ['./domestic-chores.component.scss']
})
export class DomesticChoresComponent implements OnInit {

	@Input() mission: IUserMission;

  constructor() { }

  ngOnInit() {
  }

}
