import { TestBed } from '@angular/core/testing';

import { LocalsettingService } from './localsetting.service';

describe('LocalsettingService', () => {
  let service: LocalsettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalsettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
