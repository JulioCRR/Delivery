import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPeticionesWebComponent } from './solicitud-peticiones-web.component';

describe('SolicitudPeticionesWebComponent', () => {
  let component: SolicitudPeticionesWebComponent;
  let fixture: ComponentFixture<SolicitudPeticionesWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudPeticionesWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPeticionesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
