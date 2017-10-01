import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.store';
import { IAuthUser, ILayout, IUser, ParentComponent } from '../../models/barrel-models';
import { routes_constants } from '../../constants/barrel-constants';

import { MaterializeAction, MaterializeDirective } from 'angular2-materialize';

import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ParentComponent implements OnInit {

	sidenavActions;
	sidenavParams;
	currentRoute: string;

  public authUser: Observable<IAuthUser>;
  public user: Observable<IUser>;
	public headerText: string;

  constructor(private store: Store<AppState>,
              private router: Router,
              private toast: ToastService,
              private auth: AuthService) {
    super();
    this.authUser = this.store.select('auth');
    this.user = this.store.select('user').filter(user => user != null);
  	this.store.select('layout').subscribe((layout: ILayout) => this.headerText = layout.headerText);
    this.sidenavActions = new EventEmitter<any>();
  }


  ngOnInit() {
  }


  public showSidenav(): void {
      this.sidenavActions.emit('sideNav');
  }

  public closeSideNav() {
    this.sidenavActions.emit({action: 'sideNav'});
  }

  public logout(): void {
    this.auth.logout()
      .then((res) => this.router.navigate([routes_constants.login]))
      .catch((error) => this.toast.openSnackBar(error, ''));
  }

}
