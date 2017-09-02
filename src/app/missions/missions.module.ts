import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMissionsComponent } from './view-missions/view-missions.component';

import { MdCardModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule
  ],
  declarations: [ViewMissionsComponent]
})
export class MissionsModule { }
