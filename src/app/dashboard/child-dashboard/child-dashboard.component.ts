import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserMission, AppState, IUser, ParentComponent,
	IGetChildrenRequest, IGetChildrenResponse } from '../../shared/models/barrel-models';
import { mission_status, routes_constants, 
	communication_constant } from '../../shared/constants/barrel-constants';
import { ChangeHeaderText } from '../../shared/actions/barrel-actions';

import { ServerCommunicationService } from '../../shared/services/server-communication.service';

@Component({
  selector: 'app-child-dashboard',
  templateUrl: './child-dashboard.component.html',
  styleUrls: ['./child-dashboard.component.scss']
})
export class ChildDashboardComponent implements OnInit {

	public children: IUser[] = []; 

    constructor(private store: Store<AppState>,
    			private server: ServerCommunicationService) { }

    ngOnInit() {
  		this.store.dispatch(new ChangeHeaderText(routes_constants.dashboard.header));

  		// Get Children
  		this.store.select('user')
  		.filter((user: IUser) => user != null)
  		.subscribe((user: IUser) => {
  			const req: IGetChildrenRequest = {
  				requestType: communication_constant.getChildren,
  				authIDs: user.childsIDs
  			};
  			this.server.request(req).then((res: IGetChildrenResponse) => {
  				this.children = res.children;
  			});
  		});
    }

}
