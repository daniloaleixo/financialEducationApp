import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TutorialComponent } from './tutorial.component';
import { MyDatePickerModule } from 'mydatepicker';

import { TutorialService } from './tutorial.service';

import {
	MatIconModule,
	MatButtonModule,
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule,
  MatRadioModule,
  MatInputModule,
} from '@angular/material';
import { FirstTimeComponent } from './first-time/first-time.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MyDatePickerModule,
    MatRadioModule,
    MatInputModule
  ],
  declarations: [TutorialComponent, FirstTimeComponent],
  providers: [TutorialService]
})
export class TutorialModule { }
