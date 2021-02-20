import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorWsm2kComponent } from './monitor-wsm2k.component';

describe('MonitorWsm2kComponent', () => {
  let component: MonitorWsm2kComponent;
  let fixture: ComponentFixture<MonitorWsm2kComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorWsm2kComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorWsm2kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
