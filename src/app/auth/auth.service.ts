import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILoginRequest, ILoginResponse, AppState } from '../shared/models/barrel-models';
import { AuthChange } from '../shared/actions/barrel-actions';
import { errorMessages } from '../shared/constants/barrel-constants';

import { ServerCommunicationService } from '../shared/services/server-communication.service';

@Injectable()
export class AuthService {

  constructor(private server: ServerCommunicationService,
  						private store: Store<AppState>) { }

  public login(request: ILoginRequest): Promise<ILoginResponse> {
  	return new Promise<ILoginResponse>((resolve, reject) => {
	  	this.server.request(request)
	  		.then((response: ILoginResponse) => {
	  			this.store.dispatch(new AuthChange(response.user));
	  			resolve(response);
	  		})
	  		.catch((err: Error) => {
          console.error('AuthService | login | Erro ao tentar fazer o login');
          reject(errorMessages.loginError)
        });
  	});
  }

  public logout(): void {
    	
  }

}
