import { TestBed } from '@angular/core/testing';

import { LoadingMgrService } from './loading-mgr.service';

describe('LoadingMgrService', () => {
  let service: LoadingMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
