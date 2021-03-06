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
  IUpdateMissionRequest,
  IInitResponse,
  DBUserMissionRelationship,
  IGetChildrenRequest,
  IGetChildrenResponse,
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
  		user: null,
      authUser: null,
  	};

    // Login
    if(request.requestType === communication_constant.login)
      myResponse.authUser = await this.afAuth.auth
        .signInWithEmailAndPassword(request.email, request.password);
    
    // Register
    if(request.requestType === communication_constant.register)
      myResponse.authUser = await this.afAuth.auth
        .createUserWithEmailAndPassword(request.email, request.password);

    // Login google
    if(request.requestType === communication_constant.loginGoogle){
      const result = await this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      myResponse.authUser = result.user;
    }

  	if(myResponse.authUser == null) 
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
          this.db.list(`/users/${user.uid}/missions/`)
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
    let userResponse: IUser = newUser('', '');

    return new Promise<IUser>((resolve, reject) => {
      this.user
      .filter(user => user != null)
      .subscribe((user: firebase.User) => {

        this.databaseSnapshot
        .filter(snapshot => snapshot != null)
        .subscribe(snapshot => {
          if(snapshot['users'] && snapshot['users'][user.uid]) {
            userResponse = snapshot['users'][user.uid];

            // Transform mission id in IMissions
            if (snapshot['users'][user.uid].missions) {
              const userMissionsId: DBUserMissionRelationship[] = 
                Object.keys(snapshot['users'][user.uid].missions)
                .map(key => snapshot['users'][user.uid].missions[key])

              // Put the missions
              userResponse.userMissions = userMissionsId
                .map((missionRel: DBUserMissionRelationship) => {
                  return {
                    status: missionRel.status,
                    progress: missionRel.progress,
                    ... this.missionHash[missionRel.idMission],
                  }
                });
            } else userResponse.userMissions = [];

            resolve(userResponse);
          } 
          else
            resolve(userResponse);
        });
      })
    })
  }


  public updateUserInfo(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.user
      .filter(authUser => user != null)
      .subscribe((authUser: firebase.User) => {
        if (this.user) {
          this.db.object(`/users/${authUser.uid}`)
          .set(user)
          .then((res) => resolve(user))
          .catch((error: Error) => reject(errorMessages.updateUserError));
        } else reject(errorMessages.updateUserError);
      })
    })
  }

  public getAllUsers(): Promise<IUser[]> {
    let users: IUser[] = [];

    return new Promise<IUser[]>((resolve, reject) => {
      this.databaseSnapshot
      .filter(db => db != null)
      .subscribe(db => {
        if(db['users']) {
          Object.keys(db['users']).map(key => {
            users.push(db['users'][key]);
          });
        }
        resolve(users);
      });
    });
  }

  public getAllChild(req: IGetChildrenRequest): Promise<IGetChildrenResponse> {
    return new Promise<IGetChildrenResponse>((resolve, reject) => {

      const children: IUser[] = [];

      this.databaseSnapshot
      .filter(snapshot => snapshot != null)
      .subscribe(snapshot => {

        req.authIDs.map((authID: string) => {

          let child: IUser;

          if(snapshot['users'] && snapshot['users'][authID]) {
            child = snapshot['users'][authID];

            // Transform mission id in IMissions
            if (snapshot['users'][authID].missions) {
              const userMissionsId: DBUserMissionRelationship[] = 
                Object.keys(snapshot['users'][authID].missions)
                .map(key => snapshot['users'][authID].missions[key])

              // Put the missions
              child.userMissions = userMissionsId
                .map((missionRel: DBUserMissionRelationship) => {
                  return {
                    status: missionRel.status,
                    progress: missionRel.progress,
                    ... this.missionHash[missionRel.idMission],
                  }
                });
            } else child.userMissions = [];

            children.push(child);
          }

        }); //End map through authIDs

        resolve({
          children: children
        });
      });
    })
  }


}
