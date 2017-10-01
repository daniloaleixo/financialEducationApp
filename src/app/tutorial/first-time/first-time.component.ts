import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
	TAllowanceFrequence,
	TGenre,
	IUser,
	newUser,
	IAuthUser,
	AppState
} from '../../shared/models/barrel-models';
import { TutorialService } from '../tutorial.service';
import { routes_constants } from '../../shared/constants/barrel-constants';

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
export class FirstTimeComponent implements OnInit {

	myDatePickerOptions = {
	  // other options...
	  dateFormat: 'dd-mm-yyyy',
	};

	public step: number;
	public nSteps = 2;
	public genres: IGenre[] = [
		{
			name: 'Menino',
			value: 'M'
		},
		{
			name: 'Menina',
			value: 'W'
		}
	];
	public frequences: IGenre[] = [
		{
			name: 'Semanalmente',
			value: 'W'
		},
		{
			name: 'Mensalmente',
			value: 'M'
		}
	];



	public user: IUser;
	public authUser: Observable<IAuthUser>;

  constructor(private store: Store<AppState>,
  						private router: Router,
  						private tutorialService: TutorialService) {
  	this.step = 0;
  	this.user = newUser();
  	this.authUser = this.store.select('auth');
  }

  ngOnInit() {
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
  		.then(() => this.router.navigate([routes_constants.init]));
  }

}
