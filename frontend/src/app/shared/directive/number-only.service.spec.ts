import { TestBed, inject } from '@angular/core/testing';

import { NumberOnlyService } from './number-only.service';

describe('NumberOnlyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberOnlyService]
    });
  });

  it('should be created', inject([NumberOnlyService], (service: NumberOnlyService) => {
    expect(service).toBeTruthy();
  }));
});
