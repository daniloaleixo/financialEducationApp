import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TutorialComponent } from './tutorial.component';

import { MdIconModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [TutorialComponent]
})
export class TutorialModule { }
