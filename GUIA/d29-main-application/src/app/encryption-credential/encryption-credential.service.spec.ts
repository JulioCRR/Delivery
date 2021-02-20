/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncryptionCredentialService } from './encryption-credential.service';

describe('EncryptionCredentialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptionCredentialService]
    });
  });

  it('should ...', inject([EncryptionCredentialService], (service: EncryptionCredentialService) => {
    expect(service).toBeTruthy();
  }));
});
