import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticChoresComponent } from './domestic-chores.component';

describe('DomesticChoresComponent', () => {
  let component: DomesticChoresComponent;
  let fixture: ComponentFixture<DomesticChoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticChoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
