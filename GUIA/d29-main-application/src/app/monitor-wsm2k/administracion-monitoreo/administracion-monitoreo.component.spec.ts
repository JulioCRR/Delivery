import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionMonitoreoComponent } from './administracion-monitoreo.component';

describe('AdministracionMonitoreoComponent', () => {
  let component: AdministracionMonitoreoComponent;
  let fixture: ComponentFixture<AdministracionMonitoreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionMonitoreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
