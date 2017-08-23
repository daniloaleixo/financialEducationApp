import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

// Auth Module
import { LoginComponent } from './auth/login/login.component';


export const appRoutes: Routes = [
	{
		path: '',
		children: [
		],
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
];

