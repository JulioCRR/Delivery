import { TestBed, inject } from '@angular/core/testing';

import { PeticionesWSService } from './peticiones-ws.service';

describe('PeticionesWSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeticionesWSService]
    });
  });

  it('should be created', inject([PeticionesWSService], (service: PeticionesWSService) => {
    expect(service).toBeTruthy();
  }));
});
