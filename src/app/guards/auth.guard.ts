import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginMgrService } from '../services/login-mgr.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginMgr = inject(LoginMgrService);
  const router = inject(Router);

  if (loginMgr.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
