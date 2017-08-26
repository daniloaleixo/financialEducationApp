import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthChange } from './auth/auth.actions';


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

  constructor(private afAuth: AngularFireAuth, private store: Store<any>) {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			// Link directly with the store
			console.log('user', user);
	    this.store.dispatch(new AuthChange(user));
		});
  }
}
