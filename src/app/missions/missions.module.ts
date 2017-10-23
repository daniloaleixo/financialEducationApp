import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewMissionsComponent } from './view-missions/view-missions.component';

import { MdCardModule, MdButtonModule, MdIconModule, MdInputModule, MdCheckboxModule } from '@angular/material';

import { MissionsService } from './missions.service';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { DomesticChoresComponent } from './shared/mission-types/domestic-chores/domestic-chores.component';
import { MissionTypesComponent } from './shared/mission-types/mission-types.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule
  ],
  declarations: [ViewMissionsComponent, MissionDetailsComponent, DomesticChoresComponent, MissionTypesComponent],
  providers: [MissionsService]
})
export class MissionsModule { }
