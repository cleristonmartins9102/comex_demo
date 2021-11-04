import { TestBed, inject } from '@angular/core/testing';

import { TipoPapelService } from './tipo-papel.service';

describe('TipoPapel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoPapelService]
    });
  });

  it('should be created', inject([TipoPapelService], (service: TipoPapelService) => {
    expect(service).toBeTruthy();
  }));
});
