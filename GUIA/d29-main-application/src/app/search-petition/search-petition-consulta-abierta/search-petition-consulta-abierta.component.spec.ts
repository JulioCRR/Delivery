import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPetitionConsultaAbiertaComponent } from './search-petition-consulta-abierta.component';

describe('SearchPetitionConsultaAbiertaComponent', () => {
  let component: SearchPetitionConsultaAbiertaComponent;
  let fixture: ComponentFixture<SearchPetitionConsultaAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPetitionConsultaAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPetitionConsultaAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
