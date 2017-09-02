import { Routes } from '@angular/router';

import { routes_constants } from './shared/constants/routes.constant';

import { HomeComponent } from './home.component';

// Auth Module
import { LoginComponent } from './auth/login/login.component';

import { TestComponent } from './test/test/test.component';
import { InitComponent } from './init/init.component';
import { TutorialComponent } from './tutorial/tutorial.component';

import { ViewMissionsComponent } from './missions/view-missions/view-missions.component';


export const appRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: InitComponent
			},
			{
				path: routes_constants.tutorial.path.slice(1),
				component: TutorialComponent
			},
			{
				path: 'test',
				component: TestComponent
			},
			{
				path: routes_constants.viewMissions.path.slice(1),
				component: ViewMissionsComponent
			}
		],
		component: HomeComponent
	},
	{
		path: routes_constants.login.path.slice(1),
		component: LoginComponent
	},
];

