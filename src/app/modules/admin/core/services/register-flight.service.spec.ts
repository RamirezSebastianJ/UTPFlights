import { TestBed } from '@angular/core/testing';

import { RegisterFlightService } from './register-flight.service';

describe('RegisterFlightService', () => {
  let service: RegisterFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
