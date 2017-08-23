import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

// Material
import {MdToolbarModule,
	MdIconModule,
	MdInputModule,
	MdButtonModule
} from '@angular/material';

import { ServerCommunicationService } from './services/server-communication.service';
import { FirebaseCommunicationService } from './services/firebase-communication.service';

@NgModule({
  imports: [
  	MdToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [ServerCommunicationService, FirebaseCommunicationService]
})
export class CommonModule { }
