import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';

// Material
import {
	MdToolbarModule,
	MdIconModule,
	MdInputModule,
	MdButtonModule
} from '@angular/material';
import { MaterializeModule } from 'angular2-materialize';

// My services
import {
	ServerCommunicationService
} from './services/server-communication.service';

import {
	FirebaseCommunicationService
} from './services/firebase-communication.service';

import {
  InitAppService
} from './services/init-app.service';


@NgModule({
  imports: [
    CommonModule,
  	MdToolbarModule,
  	RouterModule,
  	MaterializeModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [
    ServerCommunicationService,
    FirebaseCommunicationService,
    InitAppService
  ]
})
export class SharedModule { }
