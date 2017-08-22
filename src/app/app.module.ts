import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// REDUX
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from './store';

// MAterial Modules
import { MdToolbarModule, MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';

// My Modules
import { CommonModule } from './common/common.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgReduxModule, //REDUX
    MdToolbarModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
