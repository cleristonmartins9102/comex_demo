import { TestBed, inject } from '@angular/core/testing';

import { GetEmpresaService } from './get-empresa.service';

describe('GetEmpresaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetEmpresaService]
    });
  });

  it('should be created', inject([GetEmpresaService], (service: GetEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
