import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-missions',
  templateUrl: './view-missions.component.html',
  styleUrls: ['./view-missions.component.scss']
})
export class ViewMissionsComponent implements OnInit {

	a = [1, 2, 3, 4]

  constructor() { }

  ngOnInit() {
  }

}
