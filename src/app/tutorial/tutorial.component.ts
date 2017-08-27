import { Component, OnInit } from '@angular/core';

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

  constructor() {
  	this.imageIndex = 0;
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
