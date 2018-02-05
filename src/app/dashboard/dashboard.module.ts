import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildDashboardComponent } from './child-dashboard/child-dashboard.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ChildDashboardComponent]
})
export class DashboardModule { }
