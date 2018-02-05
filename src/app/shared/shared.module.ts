import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';

// Material
import {
	MatToolbarModule,
	MatIconModule,
	MatInputModule,
	MatButtonModule,
  MatSnackBarModule
} from '@angular/material';
import { MaterializeModule } from 'angular2-materialize';

// My services
import {
	ServerCommunicationService
} from './services/server-communication.service';
import {
	FirebaseCommunicationService
} from './services/firebase-communication.service';

import { ToastService } from './services/toast.service';
import { GoogleChartsDirective } from './directives/google-charts.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
  	MatToolbarModule,
    MatSnackBarModule,
  ],
  declarations: [HeaderComponent, GoogleChartsDirective],
  exports: [HeaderComponent, GoogleChartsDirective],
  providers: [
    ServerCommunicationService,
    FirebaseCommunicationService,
    ToastService
  ]
})
export class SharedModule { }
