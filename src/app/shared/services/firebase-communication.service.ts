import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// Firebase
import { AngularFireAuth,FirebaseAuthStateObservable } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';

// Model
import {
  ILoginRequest,
  ILoginResponse,
  IMission,
  IAddMissionRequest,
  IGetAllMissionsResponse
} from '../models/barrel-models';
import { communication_constant } from '../constants/communication.constant';
import { AppState } from '../../app.store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class FirebaseCommunicationService {

  private databaseSnapshot: BehaviorSubject<any>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private store: Store<AppState>) {
    this.databaseSnapshot = new BehaviorSubject<any>(null);
    this.databaseSnapshot.publishReplay(1);

    this.getDatabase();
  }


  // Get the whole DB
  private getDatabase(): void {
    this.db.object('/', { preserveSnapshot: true }).$ref
      .on('value', (snapshot) => {
        console.log('database snapshot', snapshot.val());
        this.databaseSnapshot.next(snapshot.val());
      });
  }


  // Will login or register user either by email or by google
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

  public logout(): void {
  	this.afAuth.auth.signOut();
  }

  public getAllMissions(): Promise<IGetAllMissionsResponse> {
    return new Promise<IGetAllMissionsResponse>((resolve, reject) => {
      this.databaseSnapshot
      .filter(snapshot => snapshot != null)
      .subscribe(snapshot => {
        const missions: IMission[] = snapshot.missions;
        if(missions) resolve({ missions: missions});
        else reject('Erro pegar missions');
      });
    })
  }

  public async addMission(request: IAddMissionRequest): Promise<string> {
    const sucessMessage = 'Missão adiciona com sucesso';
    const errorMessage = Error('Erro ao adicionar missão');

    return new Promise<string>((resolve, reject) => {
      // Wait to system to login and then get the database
      this.afAuth.authState.subscribe((user: firebase.User) => {

        if (user) {
          this.db.list(`${user.uid}/missions/`)
          .push(request)
          .then((res) => { console.log(res); resolve(sucessMessage)})
          .catch((error: Error) => reject(errorMessage));
        } else reject(errorMessage);
        
      });

    });

  }




}
