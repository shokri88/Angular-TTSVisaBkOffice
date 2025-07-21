import { TestBed } from '@angular/core/testing';

import { TtsVisaService } from './tts-visa.service';

describe('TtsVisaService', () => {
  let service: TtsVisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtsVisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
