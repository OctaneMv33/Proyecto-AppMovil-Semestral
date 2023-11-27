import { TestBed } from '@angular/core/testing';

import { ObtenerAsignaturaService } from './obtener-asignatura.service';

describe('ObtenerAsignaturaService', () => {
  let service: ObtenerAsignaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerAsignaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
