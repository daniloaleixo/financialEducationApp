import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ILoginRequest } from '../../common/models/communication.model';
import { communication_constant } from '../../common/constants/communication.constant';

import { ServerCommunicationService } from '../../common/services/server-communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public registerMode: boolean;
	public passwordValidator: string;

	public formInfo: ILoginRequest;

  constructor(private serverComm: ServerCommunicationService,
  						private router: Router) {
  	this.resetForm();
  }

  ngOnInit() {
  }

  login(): void {
  	this.formInfo.requestType = communication_constant.login;
		this.serverComm.request(this.formInfo);
	}

	register(): void {
  	this.formInfo.requestType = communication_constant.register;
		this.serverComm.request(this.formInfo);
	}

	loginGoogle(): void {
  	this.formInfo.requestType = communication_constant.loginGoogle;
		this.serverComm.request(this.formInfo);
	}

	resetForm(): void {
		this.registerMode = false;
		this.passwordValidator = '';
		this.formInfo = {
			requestType: communication_constant.login,
			email: '',
			password: ''
		};
	}

}
