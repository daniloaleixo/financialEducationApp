import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
	IUser,
	newUser,
	IAuthUser,
	IRequest,
	AppState, 
	ParentComponent
} from '../../shared/models/barrel-models';
import { TAllowanceFrequence, TGenre, TRole } from '../../shared/types/barrel-types';
import { TutorialService } from '../tutorial.service';
import { routes_constants, communication_constant } from '../../shared/constants/barrel-constants';

import { ServerCommunicationService } from '../../shared/services/server-communication.service';

import { Observable } from 'rxjs/Observable';


interface IGenre {
	name: string;
	value: TGenre;
}

interface IFrequence {
	name: string;
	value: TAllowanceFrequence;
}

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.scss']
})
export class FirstTimeComponent extends ParentComponent implements OnInit {

	myDatePickerOptions = {
	  // other options...
	  dateFormat: 'dd-mm-yyyy',
	};

	public step: number;
	public nChildSteps = 3;
	public genres: IGenre[] = [
		{
			name: 'Menino',
			value: TGenre.MALE
		},
		{
			name: 'Menina',
			value: TGenre.FEMALE
		}
	];
	public frequences: IFrequence[] = [
		{
			name: 'Semanalmente',
			value: TAllowanceFrequence.WEEKLY
		},
		{
			name: 'Mensalmente',
			value: TAllowanceFrequence.MONTHLY
		}
	];



	public user: IUser;
	public authUser: Observable<IAuthUser>;
	public allUsers: IUser[] = [];

  constructor(private store: Store<AppState>,
				private router: Router,
				private server: ServerCommunicationService, 
				private tutorialService: TutorialService) {
  	super();
  	this.step = 0;
  	this.authUser = this.store.select('auth');
  	this.getAllUsers();

  	this.authUser
  	.filter(user => user != null)
  	.subscribe((user: IAuthUser) => {
  		this.user = newUser(user.displayName, user.uid);
  	});
  }

  ngOnInit() {
  }

  private async getAllUsers(): Promise<void> {
  	const request: IRequest = {
  		requestType: communication_constant.getAllUsers
  	}
  	this.allUsers = <IUser[]>(await this.server.request(request));
  	debugger
  }

  public changeBirthDate(date): void {
  	this.user.birthDate = date.jsdate;
  }

  public changeGenre(genre: TGenre): void {
  	this.user.genre = genre;
  }

  public changeAllowanceFreq(freq: TAllowanceFrequence): void {
  	this.user.frequence = freq;
  }

  finish(): void {
  	this.tutorialService.finishFirstTime(this.user)
  		.then(() => this.router.navigate([routes_constants.init.path]));
  }

}
