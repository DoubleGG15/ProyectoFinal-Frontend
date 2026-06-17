import { TestBed } from '@angular/core/testing';

import { Agreement } from './agreement';

describe('Agreement', () => {
  let service: Agreement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Agreement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
