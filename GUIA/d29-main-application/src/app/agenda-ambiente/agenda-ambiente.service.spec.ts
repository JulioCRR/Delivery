import { TestBed, inject } from '@angular/core/testing';

import { AgendaAmbienteService } from './agenda-ambiente.service';

describe('ProjectAgendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaAmbienteService]
    });
  });

  it('should be created', inject([AgendaAmbienteService], (service: AgendaAmbienteService) => {
    expect(service).toBeTruthy();
  }));
});
