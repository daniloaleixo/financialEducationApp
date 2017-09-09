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
  IResponse,
  ILoginResponse,
  IMission,
  TMissionHash,
  IUser,
  IUserMission,
  newUser,
  IAddMissionRequest,
  IAddMissionResponse,
  IInitResponse,
  DBUserMissionRelationship,
} from '../models/barrel-models';
import { communication_constant, errorMessages, sucessMessages, mission_status } from '../constants/barrel-constants';
import { AppState } from '../../app.store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class FirebaseCommunicationService {

  private databaseSnapshot: BehaviorSubject<any>;
  private user: Observable<firebase.User>;

  private missionHash: TMissionHash = {};

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
      user: await this.getUserInfo()
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
    if(request.requestType === communication_constant.loginGoogle){
      const result = await this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      myResponse.user = result.user;
    }

  	if(myResponse.user == null) 
      console.error('Não consegui fazer o login, deu algum erro');

  	return myResponse;
  }

  public logout(): Promise<IResponse> {
    return new Promise<IResponse>((resolve, reject) => {
  	  this.afAuth.auth.signOut()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }


  public async addMission(request: IAddMissionRequest): Promise<IAddMissionResponse> {
    
    return new Promise<IAddMissionResponse>((resolve, reject) => {
      this.user
      .filter(user => user != null)
      .subscribe((user: firebase.User) => {
        if (this.user) {
          const dbMission: DBUserMissionRelationship = {
            idMission: request.idMission,
            status: mission_status.inProgress,
            progress: 0
          };
          this.db.list(`${user.uid}/missions/`)
          .push(dbMission)
          .then((res) => resolve({
              userMission: {...dbMission, ...this.missionHash[dbMission.idMission]}
            })
          )
          .catch((error: Error) => reject(errorMessages.addMissionError));
        } else reject(errorMessages.addMissionError);
      })
    });

  }


  private getAllMissions(): Promise<TMissionHash> {
    return new Promise<TMissionHash>((resolve, reject) => {
      this.databaseSnapshot
      .filter(snapshot => snapshot != null)
      .subscribe(snapshot => {
        const missions: IMission[] = snapshot.missions;
        if(missions) {
          let missionHash: TMissionHash = {};
          missions.map(mission => missionHash[mission.id] = mission);

          // I have to do this because I do not have the missions yet in memory
          // In theory the backend would provide the user with all missions
          this.missionHash = missionHash;
          resolve(missionHash);
        }
        else reject('Erro pegar missions');
      });
    })
  }

  private getUserInfo(): Promise<IUser> {
    let userResponse: IUser = newUser();

    return new Promise<IUser>((resolve, reject) => {
      this.user
      .filter(user => user != null)
      .subscribe((user: firebase.User) => {

        this.databaseSnapshot
        .filter(snapshot => snapshot != null)
        .subscribe(snapshot => {
          if(snapshot[user.uid]) {
            userResponse = snapshot[user.uid];

            // Transform mission id in IMissions
            const userMissionsId: DBUserMissionRelationship[] = 
              Object.keys(snapshot[user.uid].missions)
              .map(key => snapshot[user.uid].missions[key])

            // Put the missions
            userResponse.userMissions = userMissionsId
              .map((missionRel: DBUserMissionRelationship) => {
                return {
                  status: missionRel.status,
                  progress: missionRel.progress,
                  ... this.missionHash[missionRel.idMission],
                }
              });

            resolve(userResponse);
          } 
          else
            resolve(userResponse);
        });
      })
    })
  }


}
