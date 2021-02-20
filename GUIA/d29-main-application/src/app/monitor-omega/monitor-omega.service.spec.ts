import { TestBed, inject } from '@angular/core/testing';

import { MonitorOmegaService } from './monitor-omega.service';

describe('MonitorOmegaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorOmegaService]
    });
  });

  it('should be created', inject([MonitorOmegaService], (service: MonitorOmegaService) => {
    expect(service).toBeTruthy();
  }));
});
