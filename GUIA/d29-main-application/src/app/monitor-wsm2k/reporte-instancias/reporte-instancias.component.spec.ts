import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInstanciasComponent } from './reporte-instancias.component';

describe('ReporteInstanciasComponent', () => {
  let component: ReporteInstanciasComponent;
  let fixture: ComponentFixture<ReporteInstanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteInstanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteInstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
