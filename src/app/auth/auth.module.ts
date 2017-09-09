import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

// Material
import { MdInputModule, MdButtonModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Material
    MdInputModule,
    MdButtonModule
  ],
  declarations: [LoginComponent],
})
export class AuthModule { }
