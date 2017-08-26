import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import * as Counter from './counter.actions';

import { AppState } from './app.store';

import { IAuthUser } from './common/models/auth.model';


@Component({
  selector: 'app-home',
  template: `<app-header></app-header>
				<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

	constructor(private router: Router) {
	}
	ngOnInit() { }

}