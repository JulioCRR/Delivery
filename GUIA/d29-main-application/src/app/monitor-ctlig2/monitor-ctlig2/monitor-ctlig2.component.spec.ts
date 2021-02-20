/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MonitorCtlig2Component } from './monitor-ctlig2.component';

describe('MonitorCtlig2Component', () => {
  let component: MonitorCtlig2Component;
  let fixture: ComponentFixture<MonitorCtlig2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorCtlig2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCtlig2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
