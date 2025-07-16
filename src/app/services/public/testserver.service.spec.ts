import { TestBed } from '@angular/core/testing';

import { TestserverService } from './testserver.service';

describe('TestserverService', () => {
  let service: TestserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
