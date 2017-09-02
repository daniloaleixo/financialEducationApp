import { Injectable } from '@angular/core';

import { ServerCommunicationService } from './server-communication.service';
import { communication_constant } from '../constants/communication.constant';

import { IGetAllMissionsResponse } from '../models/barrel-models';

@Injectable()
export class InitAppService {

  constructor(private server: ServerCommunicationService) {
  	// Get all the missions and put it in the store
  	this.server.request({requestType: communication_constant.getMissions})
  		.then((response: IGetAllMissionsResponse) => console.log('init',response));
  }

}
