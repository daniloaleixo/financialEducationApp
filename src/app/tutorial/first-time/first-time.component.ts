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
	public nParentSteps = 1;
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
	public showedUsers: IUser[] = [];

	public searchText: string = '';
	public selectedChild: IUser[] = [];

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
  }

  public handleSearchTextChange(): void {
  	if(this.searchText.length > 0)
  		this.showedUsers = this.filterResults(this.allUsers, this.searchText);
  }

  public selectDeselectChild(child: IUser): void {
  	if(this.selectedChild.includes(child)) {
  		this.selectedChild = this.selectedChild
  		.filter((user: IUser) => user != child);
  	} else {
  		this.selectedChild.push(child);
  	}
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

  public finish(): void {
  	// Add childs
  	this.user.childsIDs = this.selectedChild.map((user: IUser) => user.authID);
  	this.user.childs = this.selectedChild;

  	this.tutorialService.finishFirstTime(this.user)
  		.then(() => this.router.navigate([routes_constants.init.path]));
  }

  private filterResults(allResults: IUser[], value: string): IUser[] {
  	const allUsers: IUser[] = allResults
  	.filter((result: IUser) => result.name.toLowerCase().includes(value.toLowerCase()))
  	.concat(this.showedUsers);
	
	// Remove duplicates
	return this.unique(allUsers);
  }

	private unique(array: any[]): any[] {
	    let a = array.concat();
	    for(let i=0; i<a.length; ++i) {
	        for(let j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }
	    return a;
	};

}
