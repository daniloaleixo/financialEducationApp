import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ILoginRequest } from '../../shared/models/communication.model';
import { communication_constant } from '../../shared/constants/communication.constant';
import { routes_constants } from '../../shared/constants/routes.constant';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public registerMode: boolean;
	public passwordValidator: string;

	public formInfo: ILoginRequest;

  constructor(private auth: AuthService,
  						private router: Router) {
  	this.resetForm();
  }

  ngOnInit() {
  }

  public login(): void {
  	this.formInfo.requestType = communication_constant.login;
		this.makeRequest(this.formInfo);
	}

	public register(): void {
  	this.formInfo.requestType = communication_constant.register;
		this.makeRequest(this.formInfo);
	}

	public loginGoogle(): void {
  	this.formInfo.requestType = communication_constant.loginGoogle;
  	this.makeRequest(this.formInfo);
	}


	private makeRequest(form: ILoginRequest): void {
		this.auth.login(this.formInfo)
			.then(() => this.router.navigate([routes_constants.init.path]));
	} 

	private resetForm(): void {
		this.registerMode = false;
		this.passwordValidator = '';
		this.formInfo = {
			requestType: communication_constant.login,
			email: '',
			password: ''
		};
	}

}
