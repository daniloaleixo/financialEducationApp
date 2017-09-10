import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { routes_constants } from '../shared/constants/barrel-constants';
import { ChangeHeaderText } from '../shared/actions/barrel-actions';
import { AppState } from '../shared/models/barrel-models';



@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

	public imageIndex: number;
	public imagesUrls = [
		'assets/tela_login.jpg',
		'assets/tela_login2.jpg',
		'assets/tela_login3.jpg'
	];

  constructor(private store: Store<AppState>) {
  	this.imageIndex = 0;
    this.store.dispatch(new ChangeHeaderText(routes_constants.tutorial.header));
  }

  ngOnInit() {
  }

  increment(): void {
  	this.imageIndex = (this.imageIndex + 1) % this.imagesUrls.length; 
  }

  decrement(): void {
  	this.imageIndex--;
  }

}
