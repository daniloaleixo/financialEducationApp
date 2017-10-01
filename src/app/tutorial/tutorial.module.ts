import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TutorialComponent } from './tutorial.component';
import { MyDatePickerModule } from 'mydatepicker';

import { TutorialService } from './tutorial.service';

import {
	MdIconModule,
	MdButtonModule,
	MdSelectModule,
	MdDatepickerModule,
	MdNativeDateModule,
  MdRadioModule,
  MdInputModule,
} from '@angular/material';
import { FirstTimeComponent } from './first-time/first-time.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdIconModule,
    MdButtonModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MyDatePickerModule,
    MdRadioModule,
    MdInputModule
  ],
  declarations: [TutorialComponent, FirstTimeComponent],
  providers: [TutorialService]
})
export class TutorialModule { }
