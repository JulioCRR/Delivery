import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEiComponent } from './detalles-ei.component';

describe('DetallesEiComponent', () => {
  let component: DetallesEiComponent;
  let fixture: ComponentFixture<DetallesEiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
