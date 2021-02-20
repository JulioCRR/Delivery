/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchPetitionService } from './search-petition.service';

describe('SearchPetitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPetitionService]
    });
  });

  it('should ...', inject([SearchPetitionService], (service: SearchPetitionService) => {
    expect(service).toBeTruthy();
  }));
});
