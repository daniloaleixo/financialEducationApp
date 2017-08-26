import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

// Auth Module
import { LoginComponent } from './auth/login/login.component';

import { TestComponent } from './test/test/test.component';


export const appRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'test',
				component: TestComponent
			}
		],
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
];

