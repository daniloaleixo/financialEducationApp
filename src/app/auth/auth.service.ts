import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILoginRequest, ILoginResponse, AppState } from '../shared/models/barrel-models';

import { ServerCommunicationService } from '../shared/services/server-communication.service';

@Injectable()
export class AuthService {

  constructor(private server: ServerCommunicationService,
  						private store: Store<AppState>) { }

  public login(request: ILoginRequest): Promise<ILoginResponse> {
  	return new Promise<ILoginResponse>((resolve, reject) => {
	  	this.server.request(request)
	  		.then((response: ILoginResponse) => {
	  			// this.store.dispatch()
	  			resolve(response);
	  		})
	  		.catch(err => reject(err));
  	});
  }

  public logout(): void {
  	
  }

}
