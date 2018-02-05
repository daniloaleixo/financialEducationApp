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

  public pie_ChartData = [];

  public chartCanLoad: boolean = false;

  public pie_ChartOptions  = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    vAxis: {format: 'decimal'},
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    legend: { position: 'bottom'}
  };

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
        this.generateChart();
      });
		});
  }


  private generateChart(): void {

    this.pie_ChartData = [[
    ['Filho', 'Em Progresso', 'Completado'],
    ['2014', 1000, 400],
    ['2015', 1170, 460],
    ['2016', 660, 1120],
    ['2017', 1030, 540]]];
    this.chartCanLoad = true;

     
    this.pie_ChartData = [['Filho', 'Em Progresso', 'Completado']];
    this.childrenObjs.map((child: User, i: number) => {
      this.pie_ChartData.push([
        child.userInfo.name,
        child.getMissionsByStatus(mission_status.completed).length,
        child.getMissionsByStatus(mission_status.inProgress).length,
      ]);
    });
    this.chartCanLoad = true;
    console.log('thi', this.pie_ChartData);
  }

}
