import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorOmegaComponent } from './monitor-omega.component';

describe('MonitorOmegaComponent', () => {
  let component: MonitorOmegaComponent;
  let fixture: ComponentFixture<MonitorOmegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorOmegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorOmegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
