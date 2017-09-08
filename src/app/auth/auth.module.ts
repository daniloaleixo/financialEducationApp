import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

// Material
import { MdInputModule, MdButtonModule } from '@angular/material';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Material
    MdInputModule,
    MdButtonModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
