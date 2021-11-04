import { TestBed, inject } from '@angular/core/testing';

import { OnSubmiteService } from './on-submite.service';

describe('ServicoSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnSubmiteService]
    });
  });

  it('should be created', inject([OnSubmiteService], (service: OnSubmiteService) => {
    expect(service).toBeTruthy();
  }));
});
