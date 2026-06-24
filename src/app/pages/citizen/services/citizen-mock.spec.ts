import { TestBed } from '@angular/core/testing';

import { CitizenMock } from './citizen-mock';

describe('CitizenMock', () => {
  let service: CitizenMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
