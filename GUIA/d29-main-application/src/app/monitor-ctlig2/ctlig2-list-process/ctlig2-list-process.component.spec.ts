/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ctlig2ListProcessComponent } from './ctlig2-list-process.component';

describe('Ctlig2ListProcessComponent', () => {
  let component: Ctlig2ListProcessComponent;
  let fixture: ComponentFixture<Ctlig2ListProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ctlig2ListProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ctlig2ListProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
