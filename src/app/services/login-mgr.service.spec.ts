import { TestBed } from '@angular/core/testing';

import { LoginMgrService } from './login-mgr.service';

describe('LoginMgrService', () => {
  let service: LoginMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
