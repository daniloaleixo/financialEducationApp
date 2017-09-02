import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMissionsComponent } from './view-missions.component';

describe('ViewMissionsComponent', () => {
  let component: ViewMissionsComponent;
  let fixture: ComponentFixture<ViewMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
