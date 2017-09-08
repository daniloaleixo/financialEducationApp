import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InitComponent } from './init.component';

import { MdCardModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    RouterModule
  ],
  declarations: [InitComponent]
})
export class InitModule { }
