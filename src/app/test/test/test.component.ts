import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.store';

import { IAuthUser } from '../../shared/models/barrel-models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	public user: Observable<IAuthUser>;

  constructor(private store: Store<AppState>) {
  	this.user = this.store.select('auth');
  	this.user.subscribe(value =>
  		console.log('new user', value));
  }

  ngOnInit() {
  }

}
