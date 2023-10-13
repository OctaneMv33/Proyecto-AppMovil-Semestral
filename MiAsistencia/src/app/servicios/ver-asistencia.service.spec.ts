import { TestBed } from '@angular/core/testing';

import { VerAsistenciaService } from './ver-asistencia.service';

describe('VerAsistenciaService', () => {
  let service: VerAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
