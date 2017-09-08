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
  IInitResponse
} from '../models/barrel-models';
import { communication_constant, errorMessages, sucessMessages } from '../constants/barrel-constants';
import { AppState } from '../../app.store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class FirebaseCommunicationService {

  private databaseSnapshot: BehaviorSubject<any>;
  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private store: Store<AppState>) {
    this.databaseSnapshot = new BehaviorSubject<any>(null);
    this.databaseSnapshot.publishReplay(1);

    this.user = this.afAuth.authState;

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

  public async init(): Promise<IInitResponse> {
    return {
      missions: await this.getAllMissions(),
      userMissions: await this.getUserMissions()
    };
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


  public async addMission(request: IAddMissionRequest): Promise<string> {
    
    return new Promise<string>((resolve, reject) => {
      this.user
      .filter(user => user != null)
      .subscribe((user: firebase.User) => {
        if (this.user) {
          this.db.list(`${user.uid}/missions/`)
          .push(request.idMission)
          .then((res) => resolve(request.idMission))
          .catch((error: Error) => reject(errorMessages.addMissionError));
        } else reject(errorMessages.addMissionError);
      })
    });

  }


  private getAllMissions(): Promise<IMission[]> {
    return new Promise<IMission[]>((resolve, reject) => {
      this.databaseSnapshot
      .filter(snapshot => snapshot != null)
      .subscribe(snapshot => {
        const missions: IMission[] = snapshot.missions;
        if(missions) resolve(missions);
        else reject('Erro pegar missions');
      });
    })
  }

  private getUserMissions(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.user
      .filter(user => user != null)
      .subscribe((user: firebase.User) => {

        this.databaseSnapshot
        .filter(snapshot => snapshot != null)
        .subscribe(snapshot => {
          if(snapshot[user.uid]) {
            const userMissions: string[] = 
              Object.keys(snapshot[user.uid].missions)
              .map(key => snapshot[user.uid].missions[key])
            resolve(userMissions);
          } 
          else 
            resolve([]);
        });
      })
    })
  }


}
