import { TestBed, inject } from '@angular/core/testing';

import { SoporteBgService } from './soporte-bg.service';

describe('SoporteBgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoporteBgService]
    });
  });

  it('should be created', inject([SoporteBgService], (service: SoporteBgService) => {
    expect(service).toBeTruthy();
  }));
});
