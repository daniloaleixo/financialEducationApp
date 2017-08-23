import { Injectable } from '@angular/core';

import { ILoginRequest, ILoginResponse } from '../models/communication.model';

import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { communication_constant } from '../constants/communication.constant';

@Injectable()
export class FirebaseCommunicationService {

  constructor(private afAuth: AngularFireAuth) {
  	this.afAuth.authState.subscribe((user: firebase.User) => {
  		// Link directly with the store
  		console.log('user', user);
  	});
  }

  public async loginRegister(request: ILoginRequest): Promise<ILoginResponse> {
  	const myResponse: ILoginResponse = {
  		user: null
  	};

    // Login
    if(request.requestType === communication_constant.login)
      myResponse.user = await this.afAuth.auth
        .signInWithEmailAndPassword(request.email, request.password);
    
    // Register
    if(request.requestType === communication_constant.register)
      myResponse.user = await this.afAuth.auth
        .createUserWithEmailAndPassword(request.email, request.password);

    // Login google
    if(request.requestType === communication_constant.loginGoogle)
      myResponse.user = await this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())

  	if(myResponse.user == null) 
      console.error('Não consegui fazer o login, deu algum erro');

  	return myResponse;
  }

  logout(): void {
  	this.afAuth.auth.signOut();
  }

}
