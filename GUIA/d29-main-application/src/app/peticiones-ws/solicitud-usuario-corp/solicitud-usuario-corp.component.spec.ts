import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudUsuarioCorpComponent } from './solicitud-usuario-corp.component';

describe('SolicitudUsuarioCorpComponent', () => {
  let component: SolicitudUsuarioCorpComponent;
  let fixture: ComponentFixture<SolicitudUsuarioCorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudUsuarioCorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudUsuarioCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
