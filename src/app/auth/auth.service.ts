import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILoginRequest, ILoginResponse, IResponse, AppState } from '../shared/models/barrel-models';
import { AuthChange, Logout } from '../shared/actions/barrel-actions';
import { errorMessages, communication_constant } from '../shared/constants/barrel-constants';

import { ServerCommunicationService } from '../shared/services/server-communication.service';
import { InitAppService } from '../shared/services/init-app.service';

@Injectable()
export class AuthService {

  constructor(private server: ServerCommunicationService,
              private init: InitAppService,
  						private store: Store<AppState>) { }

  public login(request: ILoginRequest): Promise<ILoginResponse> {
  	return new Promise<ILoginResponse>((resolve, reject) => {
	  	this.server.request(request)
	  		.then((response: ILoginResponse) => {
	  			this.store.dispatch(new AuthChange(response.user));
          this.init.initSystem();
	  			resolve(response);
	  		})
	  		.catch((err: Error) => {
          console.error('AuthService | login | Erro ao tentar fazer o login');
          reject(errorMessages.loginError)
        });
  	});
  }

  public logout(): Promise<IResponse> { 
    return new Promise<IResponse>((resolve, reject) => {
      this.server.request({ requestType: communication_constant.logout})
        .then(res => {
          this.store.dispatch(new AuthChange(null));
          this.store.dispatch(new Logout());
          resolve(res);
        })
        .catch(err => {
          console.error(err);
          reject(errorMessages.logoutError);
        });
    }); 
  }

}
