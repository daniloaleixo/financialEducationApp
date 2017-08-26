import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { INCREMENT, DECREMENT, RESET } from './auth/auth.actions';

interface AppState {
  counter: number;
}

@Component({
  selector: 'app-home',
  template: `<app-header></app-header>
  <button (click)="increment()">Increment</button>
  <div>Current Count: {{ counter | async }}</div>
  <button (click)="decrement()">Decrement</button>

  <button (click)="reset()">Reset Counter</button>
				<router-outlet></router-outlet>`
})
export class HomeComponent implements OnInit {

	counter: Observable<number>;

	constructor(private router: Router, private store: Store<AppState>) {
		this.counter = store.select('counter');
	}
	ngOnInit() { }



	increment(){
		this.store.dispatch({ type: INCREMENT });
	}

	decrement(){
		this.store.dispatch({ type: DECREMENT });
	}

	reset(){
		this.store.dispatch({ type: RESET });
	}

}