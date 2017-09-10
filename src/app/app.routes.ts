import { Routes } from '@angular/router';

import { routes_constants } from './shared/constants/routes.constant';

import { HomeComponent } from './home.component';

// Auth Module
import { LoginComponent } from './auth/login/login.component';

import { TestComponent } from './test/test/test.component';
import { InitComponent } from './init/init.component';
import { TutorialComponent } from './tutorial/tutorial.component';

import { ViewMissionsComponent } from './missions/view-missions/view-missions.component';
import { MissionDetailsComponent } from './missions/mission-details/mission-details.component';


export const appRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: InitComponent
			},
			{
				path: 'tutorial',
				component: TutorialComponent
			},
			{
				path: 'test',
				component: TestComponent
			},
			{
				path: 'missions/view',
				component: ViewMissionsComponent
			},
			{
				path: 'missions/:idMission',
				component: MissionDetailsComponent
			}
		],
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
];

