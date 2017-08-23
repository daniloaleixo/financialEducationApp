import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

// Material
import { MdToolbarModule, MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';


@NgModule({
  imports: [
  	MdToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CommonModule { }
