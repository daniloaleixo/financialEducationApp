import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

// Material
import { MatInputModule, MatButtonModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Material
    MatInputModule,
    MatButtonModule
  ],
  declarations: [LoginComponent],
})
export class AuthModule { }
