import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// Firebase
import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Model
import { ILoginRequest, ILoginResponse } from '../models/communication.model';
import { communication_constant } from '../constants/communication.constant';
import { AppState } from '../../app.store';

@Injectable()
export class FirebaseCommunicationService {

  constructor(private afAuth: AngularFireAuth,
              private store: Store<AppState>) {
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
