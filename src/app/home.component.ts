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
  <button (click)="increment()">Increment</button>
  <div>Current Count: {{ counter | async }}</div>
  <button (click)="decrement()">Decrement</button>

  <button (click)="reset()">Reset Counter</button>
  <span>UID: {{ (user ? user.email : 'bla' | async) }}</span>
				<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

	counter: Observable<number>;
	user: Observable<IAuthUser>;

	constructor(private router: Router, private store: Store<AppState>) {
		this.counter = store.select('counter');
		this.user = store.select('auth');

		this.user
			.subscribe(user => user ? console.log('aqui', user.email) : 'null');
	}
	ngOnInit() { }



	increment(){
		this.store.dispatch(new Counter.Increment());
	}

	decrement(){
		this.store.dispatch(new Counter.Decrement());
	}

	reset(){
		this.store.dispatch(new Counter.Reset(3));
	}

}