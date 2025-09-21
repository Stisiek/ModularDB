import { TestBed } from '@angular/core/testing';

import { StateMgrService } from './state-mgr.service';

describe('StateMgrService', () => {
  let service: StateMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
