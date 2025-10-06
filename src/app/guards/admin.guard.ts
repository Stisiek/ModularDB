import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginMgrService } from '../services/login-mgr.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginMgr = inject(LoginMgrService);
  const router = inject(Router);

  if (loginMgr.isSuperUser()) {
    return true;
  } else {
    router.navigate(['/search']);
    return false;
  }
};
