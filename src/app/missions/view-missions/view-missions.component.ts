import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IMission, AppState } from '../../shared/models/barrel-models';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view-missions',
  templateUrl: './view-missions.component.html',
  styleUrls: ['./view-missions.component.scss']
})
export class ViewMissionsComponent implements OnInit {

	missions: Observable<IMission[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  	this.missions = this.store.select('missions');
  }

}
