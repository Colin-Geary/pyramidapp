import { TestBed } from '@angular/core/testing';

import { MtnProjService } from './mtn-proj/mtn-proj.service';

describe('MtnProjService', () => {
  let service: MtnProjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtnProjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
