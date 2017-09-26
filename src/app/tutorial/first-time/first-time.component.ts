import { Component, OnInit } from '@angular/core';

import { TGenre, IUser, newUser } from '../../shared/models/user.model';

interface IGenre {
	name: string;
	value: TGenre;
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



	public user: IUser;

  constructor() {
  	this.step = 0;
  	this.user = newUser();
  }

  ngOnInit() {
  }

  public changeBirthDate(date): void {
  	this.user.birthDate = date.jsdate;
  }

  public changeGenre(genre: TGenre): void {
  	this.user.genre = genre;
  }

  bla(){
  	debugger
  }

}
