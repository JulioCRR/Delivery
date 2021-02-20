/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ctlig2ListComponent } from './ctlig2-list.component';

describe('Ctlig2ListComponent', () => {
  let component: Ctlig2ListComponent;
  let fixture: ComponentFixture<Ctlig2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ctlig2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ctlig2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
