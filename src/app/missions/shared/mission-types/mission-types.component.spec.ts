import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTypesComponent } from './mission-types.component';

describe('MissionTypesComponent', () => {
  let component: MissionTypesComponent;
  let fixture: ComponentFixture<MissionTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
