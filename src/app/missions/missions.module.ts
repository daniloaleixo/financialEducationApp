import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMissionsComponent } from './view-missions/view-missions.component';

import { MdCardModule, MdButtonModule } from '@angular/material';

import { MissionsService } from './missions.service';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
  ],
  declarations: [ViewMissionsComponent],
  providers: [MissionsService]
})
export class MissionsModule { }
