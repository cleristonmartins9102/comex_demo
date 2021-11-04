import { TestBed, inject } from '@angular/core/testing';

import { FormValuesCompleteService } from './form-values-complete.service';

describe('FormDropdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValuesCompleteService]
    });
  });

  it('should be created', inject([FormValuesCompleteService], (service: FormValuesCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
