/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonitorCtlig2Service } from './monitor-ctlig2.service';

describe('MonitorCtlig2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorCtlig2Service]
    });
  });

  it('should ...', inject([MonitorCtlig2Service], (service: MonitorCtlig2Service) => {
    expect(service).toBeTruthy();
  }));
});
