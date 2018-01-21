import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
	IUser,
	newUser,
	IAuthUser,
	AppState
} from '../../shared/models/barrel-models';
import { TAllowanceFrequence, TGenre } from '../../shared/types/barrel-types';
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
  		.then(() => this.router.navigate([routes_constants.init.path]));
  }

}
