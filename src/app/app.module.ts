import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


// ROUTES
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';


// REDUX
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { counterReducer } from './counter.reducer';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


// My Modules
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    // ROUTES
    RouterModule.forRoot(appRoutes),
    // FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //REDUX
    StoreModule.forRoot({
      counter: counterReducer,
      auth: authReducer
    }),
    BrowserModule,
    BrowserAnimationsModule,
    // My Modules
    CommonModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
