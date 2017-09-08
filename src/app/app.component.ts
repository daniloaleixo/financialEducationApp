import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthChange } from './shared/actions/auth.actions';

import { routes_constants } from './shared/constants/routes.constant';
import { AppState } from './app.store';

import { InitAppService } from './shared/services/init-app.service';


@Component({
  selector: 'app-root',
  template: `
	<router-outlet></router-outlet>
  `
})
//
// AppCompoennt has all the page with a header
//
export class AppComponent {
  title = 'app works!';

  constructor(private afAuth: AngularFireAuth,
  						private router: Router,
              private init: InitAppService,
  						private store: Store<any>) {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			// Link directly with the store
			console.log('user', user);
	    this.store.dispatch(new AuthChange(user));
	    if(!user) this.router.navigate([routes_constants.login.path])
		});
  }
}
