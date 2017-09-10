import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


// ROUTES
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';


// REDUX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  authReducer,
  logout,
  userReducer,
  missionReducer,
  layoutReducer
} from './shared/reducers/barrel-reducers';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


// My Modules
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { InitModule } from './init/init.module';
import { TestModule } from './test/test.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { MissionsModule } from './missions/missions.module';

// My Services
import { AuthService } from './auth/auth.service';
import { InitAppService } from './shared/services/init-app.service';

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
      auth: authReducer,
      missions: missionReducer,
      user: userReducer,
      layout: layoutReducer
    },
    {
      metaReducers: [logout]
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    BrowserModule,
    BrowserAnimationsModule,
    // My Modules
    SharedModule,
    AuthModule,
    InitModule,
    TutorialModule,
    TestModule,
    MissionsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    InitAppService
  ]
})

export class AppModule {
}
