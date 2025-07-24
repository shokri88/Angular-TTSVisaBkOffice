import { TestBed } from '@angular/core/testing';

import { NovaAIService } from './nova-ai.service';

describe('NovaAIService', () => {
  let service: NovaAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
