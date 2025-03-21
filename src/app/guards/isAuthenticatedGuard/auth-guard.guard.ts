import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = localStorage.getItem('token') !== null;
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
