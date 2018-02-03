import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserMission, AppState, IUser, ParentComponent, User,
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
export class ChildDashboardComponent extends ParentComponent implements OnInit {

  public childrenObjs: User[] = [];

    constructor(private store: Store<AppState>,
    			private server: ServerCommunicationService) {
      super();
    }

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

          res.children.map((child: IUser) => {
            const userObj: User = new User();
            userObj.rehydrate(child);
            this.childrenObjs.push(userObj);
          });

  				console.log('my children', this.childrenObjs);
  			});
  		});
    }

}
