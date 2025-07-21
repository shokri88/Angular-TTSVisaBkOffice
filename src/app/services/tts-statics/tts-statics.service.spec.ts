import { TestBed } from '@angular/core/testing';

import { TtsStaticsService } from './tts-statics.service';

describe('TtsStaticsService', () => {
  let service: TtsStaticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtsStaticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
