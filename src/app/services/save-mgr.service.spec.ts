import { TestBed } from '@angular/core/testing';

import { SaveMgrService } from './save-mgr.service';

describe('SaveMgrService', () => {
  let service: SaveMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
