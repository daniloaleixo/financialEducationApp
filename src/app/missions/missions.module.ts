import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMissionsComponent } from './view-missions/view-missions.component';

import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';

import { MissionsService } from './missions.service';
import { MissionDetailsComponent } from './mission-details/mission-details.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [ViewMissionsComponent, MissionDetailsComponent],
  providers: [MissionsService]
})
export class MissionsModule { }
